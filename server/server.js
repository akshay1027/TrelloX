import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import auth from './routes/auth';
import users from './routes/users';
import boards from './routes/boards.js';
import lists from './routes/lists.js';
import cards from './routes/cards.js';
import checklists from './routes/checklists.js';

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

// Routes 
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/boards', boards);
app.use('/api/lists', lists);
app.use('/api/cards', cards);
app.use('/api/checklists', checklists);

// Server config listen to PORT
const PORT = process.env.PORT || 5001;

app.listen(PORT, ()=>{
    console.log(`server started at PORT ${PORT}`);
})