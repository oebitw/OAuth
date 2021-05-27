'use strict';

require('dotenv').config();

let url=`https://id.twitch.tv/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&scope=user:read:email`;

const oauth = document.getElementById('oauth');

oauth.setAttribute('href', url);