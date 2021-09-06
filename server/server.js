const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authentication = require('./routes/authentication');
// const users = require('./routes/users');
const boards = require('./routes/boards');
const lists = require('./routes/lists');
const cards = require('./routes/cards');
// const checklists = require('./routes/checklists');

dotenv.config();

// MongoDB config for backend API
const mongoDB_connectionOptions ={
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}

mongoose.connect(process.env.MONGO_URI, mongoDB_connectionOptions, (error) => {
    if(error) {
        return console.error('error: ', error);
    }
    console.log("mongoDB working succesfully");
});

// Express application, RESTful APIs
const app = express();

// CORS 
app.use(cors());

// parse incoming data
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Routes 
// app.use('/api/users', users);
app.use('/api/auth', authentication);
app.use('/api/boards', boards);
app.use('/api/lists', lists);
app.use('/api/cards', cards);
// app.use('/api/checklists', checklists);

// Server config listen to PORT
const PORT = process.env.PORT || 5001;

app.listen(PORT, ()=>{
    console.log(`server started at PORT ${PORT}`);
})