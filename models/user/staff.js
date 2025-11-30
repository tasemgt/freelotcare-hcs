const mongoose = require('mongoose');
const User = require('./user');

const staffSchema = new mongoose.Schema({
  address: {
    type: String
  },
  ssn: {
    type: String
  },
  agency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agency',
    required: [true, 'An Agency is required'],
    unique: true
  },
  employment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EmploymentForm',
    required: [true, 'An Approved Application is required before registering a user'],
  }
});

staffSchema.pre(/^find/, function(next){
  this.populate({ path: 'agency', select: 'name' });
  next();
});

module.exports = User.discriminator('Staff', staffSchema);