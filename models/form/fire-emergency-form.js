const mongoose = require('mongoose');
const ConsumerForm = require('./consumer-form');
const generalUtils = require('../../utils/generals');

const FireEmergencyFormSchema = new mongoose.Schema({

  address: {
    type: String,
    required: [true, 'Form must have an address']
  },
  resType: {
    type: String,
    required: [true, 'Form must have a residential Type']
  },
  officialName: {
    type: String,
    required: true
  },
  beginTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  personsEvacuated:{
    type: Number,
    required: true
  },
  fireLocation:{
    type: String,
    required: true
  },
  followUp:{
    type: String,
    required: true
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true}
});

FireEmergencyFormSchema.virtual('totalTime').get(function(){
  return generalUtils.getTimeDifference(this.beginTime, this.endTime);
});

module.exports = ConsumerForm.discriminator('FireEmergencyForm', FireEmergencyFormSchema);