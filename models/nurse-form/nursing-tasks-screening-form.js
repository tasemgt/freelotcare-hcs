const mongoose = require('mongoose');

const nursingTasksScreeningSchema = new mongoose.Schema({
  programParticipant:{
    type: String,
    required: [true, 'Program Participant is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  physicianDelegation: {
    type: String,
    required: [true, 'Physician Delegation is required']
  },
  medicalAdministration: {
    requiresAdministration: String,
    routes: [{
      route: String,
      checked: Boolean
    }],
    sections: [{
      title: String,
      questions: [{
        question: String,
        answer: String
      }]
    }]
  },
  individualSignature: {
    individual: { type: String, required: [true, 'Individual\'s signature is required']},
    date: { type: Date, required: [true, 'Individual\'s Signature date is required']}
  },
  programProviderSignature: {
    providerSignature: { type: String, required: [true, 'Program Provider\'s signature is required']},
    date: { type: Date, required: [true, 'Program Provider\'s Signature date is required']}
  },
  programProviderReview: {
    reviews: [{
      reviewText: String,
      checked: Boolean
    }],
    signature:{
      sign: String,
      title: String,
      date: Date
    }
  }
});


module.exports = mongoose.model('NursingTasksScreening', nursingTasksScreeningSchema);