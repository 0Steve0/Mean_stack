/*
 * import packages
 */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

//initialize app variable and also set port
const app = express();
const port = 3000;
//set routers for users
const users = require('./routers/users');
//set static folder
app.use(express.static(path.join(__dirname,'public')));
/*
 * Set differnet middlewares
 * Cors: we gonna make it public, so any domain could access it but we need authentication to disable some routers if users doesn't send it correctly
 * bodyParser: basically it gets data from the request. And we just use json file here to grab data
 */
app.use(cors());
app.use(bodyParser.json());
/*
 * Set differnt routers
 * any url with /users goes to users floder
 */
app.use('/users',users);

app.get('/',function(req,res){
    res.send('Test');
});

app.listen(port,function(){
  console.log('Server is running at: '+port)
});