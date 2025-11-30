const mongoose = require('mongoose');

const respiteServiceSchema = new mongoose.Schema({
  consumer:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consumer',
    required: [true, 'A consumer is required']
  },
  placeOfService: {
    type: String,
    required: [true, 'Place of Service is required']
  },
  lcNumber: {
    type: String,
    required: [true, 'Local Case Number of Service is required']
  },
  dateOfAppointment: {
    type: Date,
    required: [true, 'Appointment date is required']
  },
  sections: [{
    sectionTitle: { type: String, required: [true, 'Section Title is required']},
    activities: [{
      activityName: {type: String},
      morningTimes: {
        timeIn: {type: String},
        timeOut: {type: String},
      },
      afternoonTimes: {
        timeIn: {type: String},
        timeOut: {type: String},
      },
      eveningTimes: {
        timeIn: {type: String},
        timeOut: {type: String},
      }
    }]
  }],
  signatory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A signatory staff is required']
  },
  comment : {
    commentDate: {type: String, default: new Date()},
    staffInitials: {type: String},
    commentText: {type: String},
  }
});


respiteServiceSchema.pre(/^find/, function(next){
  this.populate([
    { path: 'consumer', select: 'firstName lastName' },
    { path: 'signatory', select: 'firstName lastName'}
  ]);
  next();
});

module.exports = mongoose.model('RespiteServiceLog', respiteServiceSchema);