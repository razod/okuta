const express = require('express');
const mongoose = require('mongoose');
const items = require('./routes/api/items');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const config = require('config');



const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
    .connect(config.get("mongoURI"), { 
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to mongodb!'))
    .catch(err => console.log(err));

app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/auth', auth); 

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server loaded on ${port}`));