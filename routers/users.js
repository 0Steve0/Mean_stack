/*
 * import packages
 */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../modles/user');
const config = require('../config/database');
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
router.post('/authentication',function(req,res){
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username,function(err,user){
    if(err) throw err;
    if(!user){
      return res.json({success:false,msg:'User Not Found'});
    }

    User.comparePassword(password,user.password,function(err,isMatch){
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user, config.secret,{
          expiresIn:3000 // set expire for 50 mins
        });
        res.json({
          success:true,
          token:'JWT'+token,
          user:{
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      }else{
        return res.json({success:false,msg:'Wrong Password'});
      }
    });
  });
});
//profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req,res,next)=> {
  res.json({user: req.user});
});

module.exports = router;
