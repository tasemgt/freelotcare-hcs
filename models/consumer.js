const mongoose = require('mongoose');
const validator = require('validator');

const consumerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'A consumer must have a first name']
  },
  lastName: {
    type: String,
    required: [true, 'A consumer must have a last name']
  },
  behaviorPlan: {
    type: String,
    required: [true, 'Behavior Plan is required'],
    enum: ['yes', 'no']
  },
  lcNumber:{
    type: String,
    required: [true, 'A consumer must have a Local Case Number'],
    unique: true
  },
  phone: { 
    type: String,
    required: [true, 'Phone number is required']
  },
  dob: {
    type: Date,
    required: [true, 'Date of Birth is required']
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  directedPlan: {
    filename: String,
    expiry: String
  },
  ipc: {
    filename: String,
    expiry: String
  },
  transferPaper: {
    filename: String,
    expiry: String
  },
  icap: {
    filename: String,
    expiry: String
  },
  idrc: {
    filename: String,
    expiry: String
  },
  consumerRights: {
    filename: String,
    expiry: String
  },
  consumerServices: [{
    service: String,
    checked: Boolean
  }],
  forms:[{
    formName: String,
    formPath: String,
    formDate: {type: Date, default: new Date()},
    staff:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'An uploading Staff is required']
    }
  }],
  agency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agency',
    required: [true, 'An Agency is required']
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

consumerSchema.pre(/^find/, function(next){
  this.populate({ path: 'agency', select: 'name' });
  next();
});

module.exports = mongoose.model('Consumer', consumerSchema);