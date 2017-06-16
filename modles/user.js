const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
  name:{
    type: String
  },
  email:{
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }
});

const User = module.exports = mongoose.model('User',UserSchema);
/*
 * Callback is an asynchronous equivalent for a function. A callback function is called at the completion of a given task.
 * Node makes heavy use of callbacks.
 * All the APIs of Node are written in such a way that they support callbacks.
 */
User.getUserById = function(id,callback){
  User.findById(id,callback);
}

User.getUserByUsername = function(username,callback){
  const query = {username: username};
  User.findOne(query,callback);
}

User.addUser = function(newUser, callback){
  bcrypt.genSalt(10,function(err,salt){
    bcrypt.hash(newUser.password,salt,function(err,hash){
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

User.comparePassword = function(candidatePassword,hash,callback){
  bcrypt.compare(candidatePassword,hash,function(err,isMatch){
    if(err) throw err;
    callback(null, isMatch);
  });
}
