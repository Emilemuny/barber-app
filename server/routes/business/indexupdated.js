'use strict';

let Business = require('../../models/business');

module.exports = {
  handler: function(request, reply){
    Business.find({phone: {'$ne': null}}, function(err, businesses){
      if(err){reply().code(400);}

      reply({businesses:businesses});
    });
  }
};
