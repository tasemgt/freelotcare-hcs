const mongoose = require('mongoose');

const rnDelegationChecklistSchema = new mongoose.Schema({
  providerName:{
    type: String,
    required: [true, 'Provider Name is required']
  },
  reviewerIndividual: {
    type: String,
    required: [true, 'Reviewer or Individual is required']
  },
  contractComponentCode: {
    type: String,
    required: [true, 'Contract No. or Component Code is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  sections: [{
    title: String,
    items: [{
      item : String,
      response: { type: String, enum: ['yes', 'no', 'n/a']},
      issues: String
    }]
  }]
});


module.exports = mongoose.model('RnDelegationChecklist', rnDelegationChecklistSchema);