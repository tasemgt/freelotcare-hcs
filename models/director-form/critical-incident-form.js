const mongoose = require('mongoose');

const criticalIncidentFormSchema = new mongoose.Schema({
  year:{
    type: String,
    unique: true
  },
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A Director is required']
  },
  months: [{
    month: {type: String},
    signature: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A Signatory is required']
    },
    dateOfCompletion: {
      type: Date,
      required: [true, 'Date of Completion in CARE is required']
    },
    date: {
      type: Date,
      required: [true, 'Date is required']
    }
  }]
});

criticalIncidentFormSchema.pre(/^find/, function(next){
  this.populate([{ path: 'signature', select: 'firstName lastName' }, { path: 'director', select: 'firstName lastName agency' }]);
  next();
});


module.exports = mongoose.model('criticalIncidentForm', criticalIncidentFormSchema);