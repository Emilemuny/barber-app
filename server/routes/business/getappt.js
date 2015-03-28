'use strict';

let Business = require('../../models/business');


module.exports = {
  auth: false,
  handler: function(request, reply){
    Business.findById(request.params.businessId, function(err, businesses){
      if(err){ reply().code(400);}


      console.log('Error', err);
      console.log('Appt', businesses);
      reply(businesses);
    });
  }
};
