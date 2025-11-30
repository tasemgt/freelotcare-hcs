const mongoose = require('mongoose');

const exclusionHostFormSchema = new mongoose.Schema({
  individualName:{
    type: String,
    required: [true, 'Individual Name is required']
  },
  hhccProviderName:{
    type: String,
    required: [true, 'HH/CC Provider is required']
  },
  nurseSignature: {
    type: String,
    required: [true, 'Nurse Signature is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  nameAndCred: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Nurse Signature is required']
  }
});

exclusionHostFormSchema.pre(/^find/, function(next){
  this.populate({ path: 'nameAndCred', select: 'firstName lastName' });
  next();
});


module.exports = mongoose.model('ExclusionHostForm', exclusionHostFormSchema);