const mongoose = require('mongoose');

const noticeForAdvisoryCommitteeFormSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'Notice date is required']
  },
  dateOfMeeting: {
    type: Date,
    required: [true, 'Meeting date is required']
  },
  timeOfMeeting: {
    type: String,
    required: [true, 'Meeting time is required']
  },
  venue: {
    type: String,
    required: [true, 'Meeting venue is required']
  },
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A Director is required']
  },
  copy: String
});


noticeForAdvisoryCommitteeFormSchema.pre(/^find/, function(next){
  this.populate([
    { path: 'director', select: 'firstName lastName' }
  ]);
  next();
});

module.exports = mongoose.model('noticeForAdvisoryCommitteeForm', noticeForAdvisoryCommitteeFormSchema);