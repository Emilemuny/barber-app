'use strict';

let Business = require('../../models/business');
let Joi = require('joi');


module.exports = {
  auth: false,
  validate: {
    payload: {
      email: Joi.string().email(),
      password: Joi.string().required(),
      // name: Joi.string().required(),
      // address: Joi.string().required(),
      // phone: Joi.string().required(),
      // yelpId: Joi.number().required()
    }
  },

  handler: function(request,reply){
    Business.register(request.payload, function(err, business){
      console.log('here here here');
      if(err){return reply().code(400);}

      let token = business.token();
      reply({token:token, business:business});
    });
  }
};
