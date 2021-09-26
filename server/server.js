const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Express application, RESTful APIs
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io");

const authenticationRoutes = require('./routes/authentication');
const boardRoutes = require('./routes/boards');

dotenv.config();

// MongoDB config for backend API
const mongoDB_connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    // useFindAndModify: false
};
mongoose.connect(process.env.MONGO_URI, mongoDB_connectionOptions, (error) => {
    if (error) {
        return console.error('error: ', error);
    }
    console.log("mongoDB working succesfully");
});

// CORS & Parse incoming data
app.use(cors());
app.use(express.json());

// Socket io and ChangeStream

const socketIo = new io.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});

console.log('Hi server')

// Check if socket connection is establised
socketIo.on('connection', function (socket) {
    console.log('Client connected!');
});

// connect to mongoose, later used for watching changes using changeStream
const connection = mongoose.connection;

// mongoose connection is establised
connection.once('open', () => {
    console.log("mongoose connection is establised successful");

    const changeStream = connection.collection('usermodels').watch({ fullDocument: 'updateLookup' });

    changeStream.on('change', (change) => {
        switch (change.operationType) {
            case 'insert':
                const newUser = {
                    _id: change.fullDocument._id,
                    name: change.fullDocument.name,
                    email: change.fullDocument.email,
                    password: change.fullDocument.password
                }
                console.log(newUser)
                socketIo.emit('user-created', newUser)
                break;

            case 'update':
                const updatedUser = {
                    _id: change.fullDocument._id,
                    name: change.fullDocument.name,
                    email: change.fullDocument.email,
                    lists: change.fullDocument.lists,
                    // activity: change.fullDocument.activity
                }
                socketIo.emit('list-updated', updatedUser.lists)
                break;
        }
    });
});

// Routes 
app.use('/api/auth', authenticationRoutes);
app.use('/api/board', boardRoutes);

// Test
app.get('/', (req, res) => res.send("Server is running"))

// Server config listen to PORT
const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
    console.log(`server started at PORT ${PORT}`);
})
