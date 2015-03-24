'use strict';

let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let moment = require('moment');
let jwt = require('jwt-simple');
let Business;


let businessSchema = mongoose.Schema({
  name : String,
  address: String,
  phone: String,
  email : {type: String, required: true},
  ownerName: String,
  yelpId: String,
  CreatedAt: {type: Date, default: Date.now, required: true},
  password: {type: String, required: true},
  pin: Number

});

businessSchema.methods.token = function(){
  let payload = {
    sub: this._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };

  return jwt.encode(payload, process.env.TOKEN_SECRET);
};


businessSchema.statics.register = function(o, cb){
  Business.findOne({email:o.email}, function(err, business){
    if(business){return cb(true);}

    business = new Business(o);
    business.password = bcrypt.hashSync(o.password, 8);
    business.save(cb);
  });
};

businessSchema.statics.authenticate = function(o, cb){
  Business.findOne({email:o.email}, function(err, business){
    if(!business){return cb(true);}

    let isGood = bcrypt.compareSync(o.password, business.password);
    if(!isGood){return cb(true);}

    cb(null, business);
  });
};


Business = mongoose.model('Business', businessSchema);
module.exports = Business;
