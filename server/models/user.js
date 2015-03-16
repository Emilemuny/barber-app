/* jshint camelcase:false */

'use strict';

let mongoose = require('mongoose');
let Request = require('request');
let qs = require('querystring');
let jwt = require('jwt-simple');
let moment = require('moment');
let User;

let userSchema = mongoose.Schema({
    displayName: String,
    photoUrl: String,
    email: String,
    phone: String,
    zipcode: String,
    github: String,
    google: String,
    facebook: String,
    twitter: String,
    instagram: String,
    createdAt: {type: Date, default: Date.now, required: true}
});

userSchema.statics.preTwitter = function(cb){
  let requestTokenUrl = 'https://api.twitter.com/oauth/request_token';
  let authenticateUrl = 'https://api.twitter.com/oauth/authenticate';
  let requestTokenOauth = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    callback: 'http://127.0.0.1:/3333/auth/twitter'
  };

    Request.post({url: requestTokenUrl, oauth:requestTokenOauth}, (err, response, body)=>{
      let oauthToken = qs.parse(body);
      let params = qs.stringify({oauth_token:oauthToken.oauth_token});
      cb(authenticateUrl + '?' + params);
    });
};

userSchema.statics.twitter = function(query, cb){
  let accessTokenUrl = 'https://api.twitter.com/oauth/access_token';
  let accessTokenOauth = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    token: query.oauth_token,
    verifier: query.oauth_verifier

  };

    Request.post({url:accessTokenUrl, oauth:accessTokenOauth}, (err, response, profile)=>{
      console.log('***TOKEN', accessTokenOauth);
      profile = qs.parse(profile);
      cb({twitter:profile.user_id, displayName:profile.screen_name});
    });
};

userSchema.statics.github = function(payload, cb){
  let accessTokenUrl = 'https://github.com/login/oauth/access_token';
  let userApiUrl = 'https://api.github.com/user';
  let params = {
    code: payload.code,
    client_id: payload.clientId,
    redirect_uri: payload.redirectUri,
    client_secret: process.env.GITHUB_SECRET
  };

    Request.get({url:accessTokenUrl, qs:params}, (err,response, accessToken)=>{
      let headers = {'User-Agent':'Satellizer'};
      accessToken = qs.parse(accessToken);
      Request.get({url:userApiUrl, qs:accessToken, headers:headers, json:true}, (err,response, profile)=>{
        cb({github:profile.id, displayName:profile.name, photoUrl:profile.avatar_url});
      });
    });
};

userSchema.statics.facebook = function(payload, cb) {
  let accessTokenUrl = 'https://graph.facebook.com/oauth/access_token';
  let graphApiUrl = 'https://graph.facebook.com/me';
  let params = {
    code: payload.code,
    client_id: payload.clientId,
    redirect_uri: payload.redirectUri,
    client_secret: process.env.FB_SECRET
  };
  Request.get({url: accessTokenUrl, qs: params, json: true}, (err, response, accessToken) => {
    accessToken = qs.parse(accessToken);
    Request.get({url: graphApiUrl, qs:accessToken, json:true}, (err, response, profile) => {
      let photoUrl = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
      console.log('**FacbookINFO', profile);
      cb({facebook:profile.id, displayName:profile.name, photoUrl:[photoUrl]});
    });
  });
};

userSchema.statics.instagram = function(payload, cb){
  let accessTokenUrl = 'https://api.instagram.com/oauth/access_token';
  let params = {
    code: payload.code,
    client_id: payload.clientId,
    redirect_uri: 'http://localhost:3333',
    client_secret: process.env.INSTAGRAM_SECRET,
    grant_type: 'authorization_code'
  };

  Request.post(accessTokenUrl, {json: true, form: params}, (err,response, body)=>{
    console.log('instaProfiledata***', body.user);
    cb({instagram:body.user.id, displayName:body.user.username, photoUrl: body.user.profile_picture});
  });
};

userSchema.statics.google = function(payload, cb) {
  let accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
  let userApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
  let params = {
    code: payload.code,
    client_id: payload.clientId,
    redirect_uri: 'http://localhost:3333',
    client_secret: process.env.GOOGLE_SECRET,
    grant_type: 'authorization_code'
  };
  Request.post(accessTokenUrl, { json: true, form: params }, (err, response, token) => {
    let accessToken = token.access_token;
    let headers = { Authorization: 'Bearer ' + accessToken };
    Request.get({url:userApiUrl, headers:headers, json:true}, (err, response, profile) => {
      console.log('**GOOGLEinfo', profile);
      cb({google:profile.sub, displayName:profile.name, photoUrl: profile.picture});
    });
  });
};

userSchema.statics.create = function(provider, profile, cb){
  let query = {};
  query[provider] = profile[provider];
  User.findOne(query, (err, user)=>{
    if(user){return cb(err, user);}
    let u = new User(profile);
    u.save(cb);
  });
};

userSchema.methods.token = function(){
  let payload = {
    sub: this._id,
    iat: moment().unix(),
    exp: moment().add(7, 'days').unix()
  };

  return jwt.encode(payload, process.env.TOKEN_SECRET);
};

User = mongoose.model('User', userSchema);
module.exports = User;
