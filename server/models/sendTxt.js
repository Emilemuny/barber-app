'use strict';

let twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
//let Business = require('./business');

let adminPhone = '+17815705158';

let textBody = function(body) {
  return `Your confirmation PIN number: ${body}`;
};

module.exports = {
  send: function(receiverId, body, cb){
    console.log('INSIDE SEND FUNCTION');
      // Business.findById(receiverId, function(err, receiver) {
        console.log('receiverId', receiverId);
        console.log('body', body);
        twilio.messages.create({
          to: receiverId,
          from: adminPhone,
          body: textBody(body)
        },cb(null, 'sent message'));
      // });
 }
};
