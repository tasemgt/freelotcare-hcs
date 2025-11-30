const mongoose = require('mongoose');

const rssSlServiceSchema = new mongoose.Schema({
  consumer:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consumer',
    required: [true, 'A consumer is required']
  },
  placeOfService: {
    type: String,
    required: [true, 'Place of Service is required']
  },
  lcNumber: {
    type: String,
    required: [true, 'Local Case Number of Service is required'],
    unique: true
  },
  week:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RssSlServiceWeek',
    required: [true, 'Week is required']
  }]
});

rssSlServiceSchema.pre(/^find/, function(next){
  this.populate({ path: 'consumer', select: 'firstName lastName' });
  next();
});

module.exports = mongoose.model('RssSlService', rssSlServiceSchema);