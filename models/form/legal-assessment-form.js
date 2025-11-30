const mongoose = require('mongoose');
const ConsumerForm = require('./consumer-form');

const legalAssessmentFormSchema = new mongoose.Schema({

  evaluator: {
    type: String,
    required: [true, 'Form must have an evaluator']
  },
  minorAdult: {
    type: String,
    required: [true, 'Form must have a Minor or Adult selected']
  },
  dob: {
    type: String,
    required: [true, 'Form must have a Date of Birth']
  },
  currentStatus: {
    type: String,
    required: [true, 'Form must have a current status']
  },
  recommendation: {
    type: String,
    required: [true, 'Form must have a recommendation']
  },
  guardianshipType: {
    type: String,
    required: [true, 'Form must have a guardianship type']
  },
  action: {
    type: String,
    required: [true, 'Form must have an action']
  },
  questions:[
    {
      title: {type: String, required: true},
      questions: [
        {
          question: {type: String, required: true},
          answer: {type: String, required: true, enum: ['Yes', 'No']}
        }
      ]
    }
  ]
});

module.exports = ConsumerForm.discriminator('LegalAssessmentForm', legalAssessmentFormSchema);