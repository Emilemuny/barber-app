/* jshint camelcase:false */

'use strict';

var yelp = require('yelp').createClient({
  consumer_key: process.env.Yelp_consumer_key,
  consumer_secret: process.env.Yelp_consumer_secret,
  token: process.env.Yelp_token,
  token_secret: process.env.Yelp_token_secret
});

// yelp.business('yelp-san-francisco', function(error, data){
//   // console.log('error', error);
//   // console.log('Data', data);
// });

module.exports = yelp;
