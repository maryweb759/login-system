const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

var schema = new Schema({
    email: { type: String, required: true, unique: true},
    username: { type: String, required: true},
    password: { type: String, required: true},
    creation_dt: { type: Date, required: true},

}) 

const saltRounds = 10;

schema.statics.hashPassword = function hashPassword(password) {
  return bcrypt.hashSync(password, saltRounds);
} 

// we used method because we have a document and we want to compare that document to our doc in the database
schema.methods.isValid  = function isValid(password) {
    // we load second arguement from db and compare it to our request
   return bcrypt.compareSync(password, this.password)
}



/*
schema.path('email').validate(async (email) => {
    const emailCount = await mongoose.models.User.countDocuments({email})
    return !emailCount
  }, 
   "email exists already"
  )
   
*/ 

module.exports = mongoose.model('User', schema)