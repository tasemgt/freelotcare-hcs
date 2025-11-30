const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  message: {
    type: String,
    required: [true, 'Message is required']
  },
  created: {
    type: Date,
    default: new Date()
  },
  user:{
    type: mongoose.schema.Types.ObjectId,
    ref: 'User'
  },
  viewed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Notification', notificationSchema);