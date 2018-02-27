const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParse = require('body-parser');

mongoose.Promise = Promise;

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const markerRouter = require('./routes/marker');

mongoose.connect('mongodb://localhost/doit');

app.use(express.static(path.join(__dirname, '../client')));
app.use(cors());
app.use(bodyParse.urlencoded({
    extended: false,
}));
app.use(bodyParse.json({}));

app.use('/api/user' , userRouter);
app.use('/api/marker' , markerRouter);
app.use('*' , indexRouter);

app.listen('3001' , () => console.log('server is running on port 3001'));