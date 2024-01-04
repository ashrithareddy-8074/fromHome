const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config()

const ExpressError =  require('./utils/ExpressError');

const userRoutes = require('./routes/users');
const foodRoutes = require('./routes/food');
const requestRoutes = require('./routes/requests');

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true })
  .then(async () => {
    console.log("Connected to Database")
  }
).catch(err => console.log(process.env.DB_CONNECT, "Connection Failed", err));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false,limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', userRoutes);
app.use('/food', foodRoutes);
app.use('/requests', requestRoutes);

app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404))
});

app.use((err, req, res, next) => {
    const {statusCode=500,  message='something not found'} = err;
    if(!err.message) err.message = 'Oh No, Something went wrong!!'
    res.status(statusCode).send('something went wrong');
});

app.listen('3000', (req, res) => {
    console.log('listening on port 3000');
});