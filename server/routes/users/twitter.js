'use strict';

let User = require('../../models/user');

module.exports = {
  auth: false,
  handler: function(request, reply){
    User.twitter(request.payload, profile=>{
      User.create( 'twitter', profile, (err, user)=>{
        let token = user.token();
        reply({token:token, user:user});
      });
    });
  }
};
