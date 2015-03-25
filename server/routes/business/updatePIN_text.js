'use strict';

let Business = require('../../models/business');
let Txtmsg = require('../../models/sendTxt');
//let Random = require('random-js')();


module.exports = {
  auth: false,
  handler: function(request, reply){
    console.log('payload', request.payload);
    console.log('bizId', request.params.businessId);
    Business.findById(request.params.businessId, (err, business) => {
     if(err){console.log('ERROR1'); return reply().code(400);}

     let pin = Math.floor(Math.random() * 1000);


     console.log('PIN', pin);
     Txtmsg.send(request.payload.phone, pin, function(err, message){
      if(err){ console.log('ERROR IN ROUTE TXTMSG'); return reply(err).code(400);}
       console.log('pinAgain', pin);
       console.log('message', message);
       reply({pin:pin, message:message});
     });

    });
}
};
