'use strict';

let Business = require('../../models/business');
let Joi = require('joi');

module.exports = {
    validate: {
      params: {
        businessId: Joi.string().required()
      },
      payload: {
        name: Joi.string(),
        address: Joi.string()
      }
    },
    handler: function(request,reply){
      Business.findOneAndUpdate({_id:request.params.businessId}, request.payload, (err, business)=>{
        reply(business);
      });
    }
};
