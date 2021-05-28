'use strict';


//////////////////////////
////// Dependencies /////
////////////////////////


require('dotenv').config();
const superagent = require('superagent');
const User = require('../models/users.js');

const tokenServerUrl = 'https://id.twitch.tv/oauth2/token'; //Change
const remoteAPI = 'https://id.twitch.tv/oauth2/validate';//Change

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

module.exports = async (req, res, next) => {
  try {
    console.log(req.query.code,'----------code------------');
    const code = req.query.code;

    const remoteToken = await exchangeCodeForToken(code);
    console.log(remoteToken, '=====TOKEN======');

    const remoteUser = await getRemoteUserInfo(remoteToken);
    console.log(remoteUser,'====USER=======');

    const [user, token] = await getUser(remoteUser);
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    next(error.message);
  }
};


async function exchangeCodeForToken(code) {
  try {
    
    const tokenResponse = await superagent.post(tokenServerUrl).send({
      client_id: CLIENT_ID,
      client_secret:CLIENT_SECRET,
      code: code,
      grant_type:`authorization_code`,
      redirect_uri: REDIRECT_URI,
    });
    const accessToken = tokenResponse.body.access_token;
    return accessToken;
    
  } catch (error) {
    console.log(error);
  }


}

// .set('user-agent', 'express-app')

async function getRemoteUserInfo(token) {
  try {
    const userResponse = await superagent.get(remoteAPI).set({
      'Authorization': `OAuth ${token}`,
    });
    const user = userResponse.body;
    return user;
    
  } catch (error) {
    console.log('get remoteUser Error:', error);
    
  }

}



async function getUser(remoteUser) {
  const user = {
    username: remoteUser.login,
    password: 'xxxx',
  };

  const userObj = new User(user);
  const userDoc = userObj.save();

  const token = userDoc.token;
  return [user, token];
}