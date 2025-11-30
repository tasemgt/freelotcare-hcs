const mongoose = require('mongoose');

const exclusionScheduleFormSchema = new mongoose.Schema({
  year:{
    type: String
  },
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A Director is required']
  },
  months: [{
    month: {type: String},
    records: [{
      sN: {type: Number},
      empVendor: {type: Boolean}
    }],
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

exclusionScheduleFormSchema.pre(/^find/, function(next){
  this.populate([{ path: 'signature', select: 'firstName lastName' }, { path: 'director', select: 'firstName lastName agency' }]);
  next();
});

exclusionScheduleFormSchema.index({ year: 1, director: -1 }, { unique: true });

module.exports = mongoose.model('ExclusionScheduleForm', exclusionScheduleFormSchema);