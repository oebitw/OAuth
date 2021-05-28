'use strict';

//////////////////////////
////// Dependencies /////
////////////////////////

const express = require('express');
const authRouter  = express.Router();

//////////////////////////
////// Imports      /////
////////////////////////


const User = require('./models/users.js');
const oauth = require('./middleware/oauth.js');




//////////////////////////
////// Routes    ////////
////////////////////////

authRouter.get('/twitch_oauth',oauth,twitchHandler);


//////////////////////////
////// Handlers  ////////
////////////////////////


  
function twitchHandler (req,res){
  res.json({ token: req.token, user: req.user });
  // res.send('successfully signed in');

}


module.exports = authRouter;