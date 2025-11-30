const mongoose = require('mongoose');
const User = require('./user');

const directorSchema = new mongoose.Schema({
  ssn: {
    type: String
  },
  title: {
    type: String
  },
  agency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agency',
    required: [true, 'An Approved Agency is required before registering a director'],
    unique: true
  }
});

directorSchema.pre(/^find/, function(next){
  this.populate({ path: 'agency', select: 'name' });
  next();
});

module.exports = User.discriminator('Director', directorSchema);