const mongoose = require('mongoose');

const formOptions = {
  discriminatorKey: 'recordType', // our discriminator key, could be anything
  collection: 'consumerforms', // the name of our collection 
};

const ConsumerFormSchema = new mongoose.Schema({
  formName: {
    type: String,
    required: [true, 'A Form must have a name']
  },
  consumer:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consumer',
    required: [true, 'A consumer is required']
  },
  dateOfAppointment: {
    type: Date,
    required: [true, 'A Form must have an appointment date']
  },
  date: {
    type: Date,
    default: new Date()
  },
  lcNumber:{
    type: String,
    required: [true, 'A Form must have an LC Number']
  },
  signatoryName:{
    type: String,
    required: [true, 'Signatory Name']
  },
  agency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agency',
    required: [true, 'An Agency is required']
  },
  staff:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A Filing Staff is required']
  }
}, formOptions);

ConsumerFormSchema.pre(/^find/, function(next){
  this.populate({ path: 'consumer', select: 'firstName lastName' });
  next();
});

module.exports = mongoose.model('ConsumerForm', ConsumerFormSchema);