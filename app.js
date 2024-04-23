const express = require('express');
const userRoutes = require('./api/routes/user');
const adminRoutes = require('./api/routes/admin');

// db
require('./db/mongoose');
// const morgan = require('morgan');
const bodyParser = require('body-parser');

//morgan
const app = express();
//app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//user routes
app.use('/user', userRoutes);

//admin routes
app.use('/admin', adminRoutes);

//app.use((req, res, next)=> {
  //  res.status(200).json({
    //    message: "Connected to server"
    //});
//});


module.exports = app;