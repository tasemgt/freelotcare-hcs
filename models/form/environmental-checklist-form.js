const mongoose = require('mongoose');
const ConsumerForm = require('./consumer-form');

const EnvChecklistFormSchema = new mongoose.Schema({

  inspector: {
    type: String,
    required: [true, 'Form must have an Inspector']
  },
  title: {
    type: String,
    required: [true, 'Form must have a Title']
  },
  site: {
    type: String,
    required: [true, 'Form must have an Inspection Site']
  },
  questions:[
    {
      title: String,
      questions: [
        {
          question: String,
          answer: String
        }
      ]
    }
  ]
});


module.exports = ConsumerForm.discriminator('EnvChecklistForm', EnvChecklistFormSchema);