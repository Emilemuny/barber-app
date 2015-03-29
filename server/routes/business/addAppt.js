'use strict';

let Business = require('../../models/business');

module.exports = {
  handler: function(request, reply){
    console.log('request', request);
    Business.findOneAndUpdate({ _id:request.params.businessId}, request.payload, function(err, business){
      if(err){return reply().code(400);}

      console.log('PayloadComingIN:**', request.payload);
      business.appt.userName = request.payload.userName;
      business.appt.apptDate = request.payload.apptDate;
      business.appt.msg = request.payload.msg;
      business.save(function(err){
      console.log('ERRORifAny***',err);
        if(err) {return reply(err);}
      });
    });
  }
};


//
// let payload = {
//   userName: $rootScope.user.displayName,
//   apptDate: apptData.dateA,
//   msg: apptData.txt
// };
// console.log('Payload to backend', payload);
// Business.setAppt(businessId, payload);
// };
