const mongoose = require('mongoose');
const ConsumerForm = require('./consumer-form');

const poisonAssessmentFormSchema = new mongoose.Schema({

  address: {
    type: String,
    required: [true, 'Form must have an address']
  },
  questions:[
    {
      question: {type: String},
      answer: {type: String, enum: ['Yes', 'No']}
    }
  ]
});

module.exports = ConsumerForm.discriminator('PoisonAssmentForm', poisonAssessmentFormSchema);