'use strict';

let Business = require('../../models/business');


module.exports = {
    auth: false,
    handler: function(request,reply){
      Business.findOneAndUpdate({ _id:request.params.businessId}, request.payload, (err, business)=>{
        if(err){reply().code(400);}

        reply(business);
      });
    }
};
