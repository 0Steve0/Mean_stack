/*
 * import packages
 */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../modles/user');

//Register
router.post('/register',function(req,res){

  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser,function(err,user){
    if(err){
      res.json({success:false, msg:'Failed to register user'});
    }else{
      res.json({success:true, msg:'Succeed to register user'});
    }
  });
});
//Authentication
router.get('/authentication',function(req,res){
  res.send('Authentication');
});
//profile
router.get('/profile',function(req,res){
  res.send('Profile');
});

module.exports = router;
