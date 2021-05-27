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


authRouter.get('/oauth_twitch',oauth,twitchHandler);


//////////////////////////
////// Handlers  ////////
////////////////////////


  
function twitchHandler (req,res){
  res.json({ token: req.token, user: req.user });

}


module.exports = authRouter;