// 'use strict';
//
// let Business = require('../../models/busines');
//
//
// module.exports = {
//   function(request, reply){
//     Business.findOne({phone: request.payload.phone}, function(err, business){
//       if(err){return reply().code(400);}
//
//       business.appt.userId = request.params.userId;
//       business.appt.apptDate = request.payload.apptDate;
//       business.appt.msg = request.payload.msg;
//       business.save(function(err){
//         if(err) {return reply(err);}
//       });
//     });
//
// };
