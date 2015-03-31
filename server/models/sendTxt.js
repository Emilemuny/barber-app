'use strict';

let twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);




class Text {
  static send(to, body, cb){
    twilio.messages.create({
      body: ` Message sent via Barber book: ${body}`,
      to: to,
      from: '+17815705199'   //Later on put this in process.env
    }, cb);
  }
}

module.exports = Text;
