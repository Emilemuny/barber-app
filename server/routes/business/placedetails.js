/* jshint camelcase:false */

'use strict';
let Request = require('request');
module.exports = {
  auth: false,
  handler: function(request, reply){
    console.log('HERE HERE****');
    console.log('paramsData', request.params.place_id);

    let headers = { 'Authorization' : ''};
    let url ='https://maps.googleapis.com/maps/api/place/details/json?placeid='+ request.params.place_id +'&key=AIzaSyBMBTI7HoN5xy3HJdQMCQpAgKYe1SwsF7o';
    Request.get({url:url, headers:headers, json:true}, function(err, response, body){
      console.log('ResponseBody', body);
      reply(body);
    });
  }
};
