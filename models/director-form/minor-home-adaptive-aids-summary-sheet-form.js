const mongoose = require('mongoose');

const minorAdaptiveSummarySheetSchema = new mongoose.Schema({
  director:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A director is required']
  },
  serviceMonth: {
    type: String,
    required: [true, 'Service Month is required']
  },
  serviceYear: {
    type: String,
    required: [true, 'Service Year is required']
  },
  componentCode: {
    type: String,
    required: [true, 'Component Code is required']
  },
  contractNumber: {
    type: String,
    required: [true, 'Contract Number is required']
  },
  contactPerson: {
    type: String,
    required: [true, 'Contact Person is required']
  },
  areaCode: {
    type: String,
    required: [true, 'Area Code is required']
  },
  telephoneNumber: {
    type: String,
    required: [true, 'Telephone Number is required']
  },
  sections: [{
    name: String,
    clientCareId: String,
    serviceDate: Date,
    minorModification: {
      serviceCode: String,
      dollarsSpent: {type: Number, default: 0},
      requisitionFee: {type: Number, default: 0}
    },
    adaptiveAids: {
      serviceCode: String,
      dollarsSpent: {type: Number, default: 0},
      requisitionFee: {type: Number, default: 0}
    }
  }],
  signature: {
    type: String,
    required: [true, 'Signature is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  }
});


minorAdaptiveSummarySheetSchema.pre(/^find/, function(next){
  this.populate([
    { path: 'director', select: 'firstName lastName' }
  ]);
  next();
});

module.exports = mongoose.model('minorAdaptiveSummarySheet', minorAdaptiveSummarySheetSchema);