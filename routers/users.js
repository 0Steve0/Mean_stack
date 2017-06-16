/*
 * import packages
 */
const express = require('express');
const router = express.Router();

//Register
router.get('/register',function(req,res){
  res.send('Register');
});
//Authentication
router.get('/authentication',function(req,res){
  res.send('Authentication');
});
//profile
router.get('/profile',function(req,res){
  res.send('Profile');
});
//Validate
router.get('/validate',function(req,res){
  res.send('Validate');
});

module.exports = router;
