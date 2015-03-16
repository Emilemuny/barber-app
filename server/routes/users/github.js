'use strict';

let User = require('../../models/user');

module.exports = {
  auth: false,
  handler: function(request, reply){
    User.github(request.payload, profile=>{
      User.create('github', profile, (err, user)=>{
        if(err){reply().code(400);}

        let token = user.token();
        reply({token:token, user:user});
      });
    });
  }
};
