var mongoose = require('mongoose');
var jwt      = require('jsonwebtoken');
var bcrypt   = require('bcrypt');

var User     = mongoose.model('User');

exports.register = function(req,res) {

};

exports.sign_in = function(req,res){

};

exports.loginRequired = function(req,res,next){

};
