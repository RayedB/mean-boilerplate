var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  // name: {
  //   type: String,
  //   trim: true,
  //   required: true
  // },
  // address: {
  //   number_and_street: {
  //     type: String,
  //     trim: true,
  //     required: true
  //   },
  //   complement_address: {
  //     type: String,
  //     trim: true
  //   },
  //   zip_code: {
  //     type: String,
  //     trim: true,
  //     required: true
  //   },
  //   city: {
  //     type: String,
  //     trim: true,
  //     required: true
  //   },
  //   country: {
  //     type: String,
  //     trim: true,
  //     required: true
  //   }
  // },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  hash_password: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
})

UserSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.hash_password);
}

UserSchema.methods.addUser = function(email,password){
  var user = new UserSchema({
    email: email,
    hash_password: bcrypt.hash(password,10,function(err,hash){
      console.log(err);
    })
  })
}

mongoose.model('User', UserSchema)
