'use strict';

var Yelp = require('../../models/yelp');

module.exports = {
  auth: false,
  handler: function(request, reply){
    console.log('HERE,worked?');
    Yelp.search({term: request.query.business, location: request.query.location, limit:1}, function(err, data){
      if(err){reply().code(400);}
      reply(data);
      console.log('Data', data);
    });
  }
};
