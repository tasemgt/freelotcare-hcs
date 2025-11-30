const mongoose = require('mongoose');

const supportedHomeLivingSchema = new mongoose.Schema({
  consumer:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consumer',
    required: [true, 'A consumer is required']
  },
  lcNumber: {
    type: String,
    required: [true, 'Local Case Number of Service is required']
  },
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A staff is required']
  },
  agency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agency',
    required: [true, 'An Agency is required']
  },
  records:[
    {type: mongoose.Schema.Types.ObjectId, ref: 'supportedHomeLivingRecord'}
  ],
  comments : [{
    commentDate: {type: Date},
    commentText: {type: String},
  }]
});

supportedHomeLivingSchema.pre(/^find/, function(next){
  this.populate([
    { path: 'consumer', select: 'firstName lastName lcNumber' },
    { path: 'staff', select: 'firstName lastName'}
  ]);
  next();
});

// supportedHomeLivingSchema.pre('findOne', function(next){
//   this.populate([
//     { path: 'consumer', select: 'firstName lastName lcNumber' },
//     { path: 'staff', select: 'firstName lastName'},
//     // { path: 'records', select: '-__v -_id'}
//   ]);
//   next();
// });

module.exports = mongoose.model('SupportedHomeLiving', supportedHomeLivingSchema);