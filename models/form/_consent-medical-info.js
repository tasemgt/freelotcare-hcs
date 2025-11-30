const mongoose = require('mongoose');

const consentMedicalInfoSchema = new mongoose.Schema({
  consumer:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consumer',
    required: [true, 'A consumer is required']
  },
  dob: {
    type: Date,
    required: [true, 'A Date of birth is required']
  },
  lcNumber:{
    type: String,
    required: [true, 'A Form must have an LC Number']
  },
  ssn:{
    type: String,
    required: [true, 'A Form must have a social security Number']
  },
  authorizedParty:{
    type: String,
    required: [true, 'Authorized Party is required']
  },
  purpose:{
    type: String,
    required: [true, 'Purpose is required']
  },
  limited:{
    type: String,
    required: [true, 'Limited Field is required']
  },
  date: {
    type: Date,
    default: new Date()
  },
  agency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agency',
    required: [true, 'An Agency is required']
  },
  staff:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A Filing Staff is required']
  }
});

consentMedicalInfoSchema.pre(/^find/, function(next){
  this.populate([
    { path: 'consumer', select: 'firstName lastName' },
    { path: 'staff', select: 'firstName lastName' },
    { path: 'agency', select: 'name' }
  ]);
  next();
});

module.exports = mongoose.model('consentMedicalInfo', consentMedicalInfoSchema);