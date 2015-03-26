'use strict';

let Business = require('../../models/business');
//let Txtmsg = require('../../models/sendTxt');
//let Joi = require('joi');

module.exports = {
  handler: function(request, reply){
    console.log('request', request);
    Business.findOneAndUpdate({ _id:request.params.businessId}, request.payload, function(err, business){
      if(err){return reply().code(400);}

      business.appt.userId = request.payload.userId;
      business.appt.apptDate = request.payload.apptDate;
      business.appt.msg = request.payload.msg;
      business.save(function(err){
        if(err) {return reply(err);}
      });
    });
  }
};
