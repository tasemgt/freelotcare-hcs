const mongoose = require('mongoose');
const ConsumerForm = require('./consumer-form');

const dentalSchema = new mongoose.Schema({

  examiner: {
    type: String,
    required: [true, 'Form must have an examiner']
  },
  diagnosis: {
    type: String,
    required: [true, 'Form must have diagnosis']
  },
  prescription: {
    type: String,
    required: [true, 'Form must have prescription']
  }

});

module.exports = ConsumerForm.discriminator('DentalExam', dentalSchema);