const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Express application, RESTful APIs
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io");

const authentication = require('./routes/authentication');

dotenv.config();

// MongoDB config for backend API
const mongoDB_connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
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
        origin: "http://localhost:3000/board",
        credentials: true
    }
});

socketIo.on('connection', function (socket) {
    console.log('Client connected!');
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("Change Stream successful");

    const changeStream = connection.collection('usermodels').watch({ fullDocument: 'updateLookup' });

    changeStream.on('change', (change) => {
        switch (change.operationType) {
            case 'insert':
                const newUser = {
                    _id: change.fullDocument._id,
                    name: change.fullDocument.name,
                    email: change.fullDocument.email,
                    photo: change.fullDocument.photo,
                    oldBG: change.fullDocument.background
                }
                console.log(newUser)
                socketIo.emit('user-signed', newUser)
                break;

            case 'update':
                const updatedUser = {
                    _id: change.fullDocument._id,
                    name: change.fullDocument.name,
                    email: change.fullDocument.email,
                    lists: change.fullDocument.lists,
                    background: change.fullDocument.background
                }
                socketIo.emit('list-updated', updatedUser.lists)
                break;
        }
    });
});

// Routes 
app.use('/api/auth', authentication);

// Test
app.get('/', (req, res) => res.send("Server is running"))

// Server config listen to PORT
const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
    console.log(`server started at PORT ${PORT}`);
})
