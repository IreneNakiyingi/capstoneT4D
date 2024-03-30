const express = require('express');
const app = express();

const userRoutes = require('./api/routes/user');
const adminRoutes = require('./api/routes/admin');

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