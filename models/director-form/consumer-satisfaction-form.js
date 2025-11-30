const mongoose = require('mongoose');

const consumerSatisfactionSchema = new mongoose.Schema({
  agency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agency',
    required: [true, 'An Agency is required']
  },
  consumer:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consumer',
    required: [true, 'A consumer is required']
  },
  personInterviewed: {
    type: String,
    required: [true, 'Person Interviewed is required']
  },
  lcNumber: {
    type: String,
    required: [true, 'Local Case Number of Service is required']
  },
  quarterlyPeriod: {
    type: String,
    required: [true, 'Quarterly Period is required']
  },
  dateOfAppointment: {
    type: Date,
    required: [true, 'Appointment date is required']
  },
  sections: [{
    item: {type:String},
    response: {type:String},
    comment: {type: String}
  }],
  signatory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A signatory staff is required']
  },
  clientLarSignature: {
    signature: {type: String, required:true},
    date: {type: Date, required:true}
  },
  programManagerSignature: {
    signature: {type: String, required:true},
    date: {type: Date, required:true}
  }
});


consumerSatisfactionSchema.pre(/^find/, function(next){
  this.populate([
    { path: 'consumer', select: 'firstName lastName' },
    { path: 'signatory', select: 'firstName lastName'},
    { path: 'agency', select: 'name'}
  ]);
  next();
});

module.exports = mongoose.model('consumerSatisfaction', consumerSatisfactionSchema);