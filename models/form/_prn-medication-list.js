const mongoose = require('mongoose');

const PrnMedicationListSchema = new mongoose.Schema({
  consumer:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consumer',
    required: [true, 'A consumer is required']
  },
  dob: {
    type: Date,
    required: [true, 'A Form must have a date of birth']
  },
  lcNumber:{
    type: String,
    required: [true, 'A Form must have an LC Number']
  },
  allergies:{
    type: String,
    required: [true, 'Allergies is required']
  },
  physicianName:{
    type: String,
    required: [true, 'Physician Name is required']
  },
  additionalPrnMeds:{
    type: String,
    required: [true, 'Additional PRN Meds is required']
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

PrnMedicationListSchema.pre(/^find/, function(next){
  this.populate([
    { path: 'consumer', select: 'firstName lastName' },
    { path: 'staff', select: 'firstName lastName' },
    { path: 'agency', select: 'name' }
  ]);
  next();
});

module.exports = mongoose.model('PrnMedicationList', PrnMedicationListSchema);