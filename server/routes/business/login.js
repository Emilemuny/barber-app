'use strict';

let Business = require('../../models/business');
let Joi = require('joi');


module.exports = {
  auth: false,
  validate: {
    payload: {
      email: Joi.string().email(),
      password: Joi.string().required()
    }
  },

  handler: function(request, reply){
    Business.authenticate(request.payload, function(err, business){
      if(err){return reply().code(400);}

      let token = business.token();
      reply({token:token, business:business});

    });
  }
};
