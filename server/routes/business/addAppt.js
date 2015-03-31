'use strict';

let Business = require('../../models/business');
let Txtmsg = require('../../models/sendTxt');

module.exports = {
  handler: function(request, reply){
    console.log('request', request);
    Business.findOneAndUpdate({ _id:request.params.businessId}, request.payload, function(err, business){
      if(err){return reply().code(400);}

      console.log('PayloadComingIN:**', request.payload);
      business.appt.userName = request.payload.userName;
      business.appt.apptDate = request.payload.apptDate;
      business.appt.msg = request.payload.msg;

      Txtmsg.send(business.phone, request.payload.msg, function(err, message){
        if(err){ console.log('ERROR IN ROUTE TXTMSG'); return reply(err).code(400);}
      });
      business.save(function(err){
      console.log('ERRORifAny***',err);
        if(err) {return reply(err);}
      });
    });
  }
};
