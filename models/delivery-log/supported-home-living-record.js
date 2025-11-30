const mongoose = require('mongoose');
const generalUtils = require('../../utils/generals');

const supportedHomeLivingRecordSchema = new mongoose.Schema({
  dateOfService: {
    type: Date,
    required: [true, 'Service date is required']
  },
  beginTime: {
    type: String,
    required: [true, 'Begin time is required']
  },
  endTime: {
    type: String,
    required: [true, 'End time is required']
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  numberOfIndividuals: {
    type: String,
    required: [true, 'Number of Individuals is required']
  },
  staffSignature:{
    type: String,
    required: [true, 'Staff Signature is required']
  },
  numberOfStaff:{
    type: String,
    required: [true, 'Number of Staff is required']
  },
  servicesCode:{
    type: String,
    required: [true, 'Services Code is required']
  },
  billableUnits:{
    type: String,
    required: [true, 'Billable Units is required']
  }
},{
  toJSON: { virtuals: true },
  toObject: { virtuals: true}
});

supportedHomeLivingRecordSchema.virtual('total_time').get(function(){
  return generalUtils.getTimeDifference(this.beginTime, this.endTime);
});

module.exports = mongoose.model('supportedHomeLivingRecord', supportedHomeLivingRecordSchema);