const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userOptions = {
  discriminatorKey: 'userType', // our discriminator key, could be anything
  collection: 'users', // the name of our collection 
};


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'A user must have a first name']
  },
  lastName: {
    type: String,
    required: [true, 'A user must have a last name']
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  photo: String,
  phone: { type: String },
  bio: String,
  role: {
    type: String,
    enum: ['admin','director', 'nurse', 'caregiver'],
    required: [true, 'Please provide a user role']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  }
});

//For Directors
userSchema.pre(/^find/, function(next){
  this.populate({ path: 'agency', select: 'name' });
  next();
});

userSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
});


//USER MODEL INSTANCE METHODS
userSchema.methods.comparePassword = async function(passwordPassedIn, userPassword){
  return await bcrypt.compare(passwordPassedIn, userPassword);
}

userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
  if(this.passwordChangedAt){
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10); //in seconds

    return JWTTimestamp < changedTimestamp; //true if password was changed after login
  }

  //Password
  return false;
}

module.exports = mongoose.model('User', userSchema);