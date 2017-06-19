/*
 * import packages
 */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
/*
 * Connect to the database
 * Connected and error show differnet messages
 */
const config = require('./config/database');
mongoose.connect(config.database);
mongoose.connection.on('connected',function(){
  console.log('Connected to database '+config.database);
});
mongoose.connection.on('error',function(err){
  console.log('Database error'+err);
});
//initialize app variable and also set port
const app = express();
const port = process.env.PORT||8080;
//set routers for users
const users = require('./routers/users');
//set static folder
app.use(express.static(path.join(__dirname,'public')));
/*
 * Set differnet middlewares
 * Cors: we gonna make it public, so any domain could access it but we need authentication to disable some routers if users doesn't send it correctly
 * bodyParser: basically it gets data from the request. And we just use json file here to grab data
 * passport: This module lets you authenticate endpoints using a JSON web token. It is intended to be used to secure RESTful endpoints without sessions.
 */
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
/*
 * Set differnt routers
 * any url with /users goes to users floder
 */
app.use('/users',users);

app.get('*',function(req,res){
  res.sendFile(path.join(__dirname,'public/index.html'));
});

app.listen(port,function(){
  console.log('Server is running at: '+port)
});
