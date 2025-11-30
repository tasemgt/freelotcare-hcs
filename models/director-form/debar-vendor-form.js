const mongoose = require('mongoose');

const debarVendorFormSchema = new mongoose.Schema({
  year:{
    type: String,
    unique: true
  },
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A Director is required']
  },
  quarters: [{
    quarter: {type: String},
    signature: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A Signatory is required']
    },
    date: {
      type: Date,
      required: [true, 'Date is required']
    }
  }]
});

debarVendorFormSchema.pre(/^find/, function(next){
  this.populate([{ path: 'signature', select: 'firstName lastName' }, { path: 'director', select: 'firstName lastName agency' }]);
  next();
});


module.exports = mongoose.model('debarVendorForm', debarVendorFormSchema);