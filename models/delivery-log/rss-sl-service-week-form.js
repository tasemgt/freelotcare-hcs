const mongoose = require('mongoose');

const rssSlServiceWeekSchema = new mongoose.Schema({
  weekNumber:{
    type: Number,
    required: [true, 'Week number is required']
  },
  logType: {
    type: String,
    enum: ['rss', 'sl'],
    required: [true, 'Log type is required']
  },
  day: [{
    dayOfWeek: {
      type: String,
      enum: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
      required: [true, 'Day of the week is required']
    },
    dateOfWeek: {type: Date, required: [true, 'Date of the week is required']},
    records:[{
      title: {type: String, required: [true, 'Title is required']},
      checks: [{
        item: {type: String, required: [true, 'Item is required']},
        checked: {type: Boolean, required: [true, 'Checked Value is required']}
      }]
    }],
    comment:{
      date: {type: Date, default: new Date()},
      staffInitials: {type: String},
      commentText: String
    },
    signature:{
      employeeName: {type: String, required: [true, 'Employee name is required']},
      initials: {type: String, required: [true, 'Initials is required']},
      staffID: {type: String, required: [true, 'Staff ID is required']},
    }
  }]
});

module.exports = mongoose.model('RssSlServiceWeek', rssSlServiceWeekSchema);