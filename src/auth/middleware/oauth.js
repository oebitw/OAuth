'use strict';


//////////////////////////
////// Dependencies /////
////////////////////////

require('dotenv').config();
const superagent = require('superagent');
const User = require('../models/users.js');

const tokenServerUrl = 'https://id.twitch.tv/oauth2/token'; //Change
const remoteAPI = 'https://api.twitch.tv/helix/users';//Change

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

module.exports = async (req, res, next) => {
  try {
    const code = req.query.code;
    const remoteToken = await exchangeCodeForToken(code);
    const remoteUser = await getRemoteUserInfo(remoteToken);
    const [user, token] = await getUser(remoteUser);
    console.log('after save to db', user, token);
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    next(error.message);
  }
};

async function exchangeCodeForToken(code) {
  const tokenResponse = await superagent.post(tokenServerUrl).send({
    code: code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
    grant_type: 'authorization_code',
  });
  const accessToken = tokenResponse.body.access_token;
  return accessToken;
}

// .set('user-agent', 'express-app')

async function getRemoteUserInfo(token) {
  const userResponse = await superagent.get(remoteAPI)
    .set('Authorization', `Bearer ${token}`)
    .set('client_id', CLIENT_ID);

  const user = userResponse.body;
  console.log('user info provided by github', user);
  return user;
}

async function getUser(remoteUser) {
  const user = {
    username: remoteUser.login,
    password: 'this_should_be_empty',
  };

  const userObj = new User(user);
  const userDoc = userObj.save();

  const token = userDoc.token;
  return [user, token];
}