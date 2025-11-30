const mongoose = require('mongoose');
const generalUtils = require('../../utils/generals');

const nursingServiceDeliverySchema = new mongoose.Schema({
  individualName:{
    type: String,
    required: [true, 'Individual Name is required']
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  lcNumber: {
    type: String,
    required: [true, 'Local Case Number is required']
  },
  descriptions: [{
    item: { type:String },
    checked: { type:Boolean }
  }],
  serviceDate: {
    type: Date,
    required: [true, 'Service Date is required']
  },
  beginTime: {
    type: String,
    required: [true, 'Begin time is required']
  },
  endTime: {
    type: String,
    required: [true, 'End time is required']
  },
  unitsOfService:{
    type: String,
    required: [true, 'Units of Service is required']
  },
  nurseName:{
    type: String,
    required: [true, 'Nurse Name is required']
  },
  nurseSignature:{
    type: String,
    required: [true, 'Nurse Signature is required']
  },
  title: {
    type: String, 
    required: [true, 'Title is required']
  },
  staffID: {
    type: String, 
    required: [true, 'Staff ID is required']
  },
  nursingComponent: [{
    item: { type: String },
    checked: { type: Boolean }
  }]
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true}
});

// nursingServiceDeliverySchema.pre(/^find/, function(next){
//   this.populate({ path: 'nurseName', select: 'firstName lastName' });
//   next();
// });

nursingServiceDeliverySchema.virtual('totalTime').get(function(){
  return generalUtils.getTimeDifference(this.beginTime, this.endTime);
});

module.exports = mongoose.model('NursingServiceDelivery', nursingServiceDeliverySchema);