const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const agencySchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, 'Agency name is required']
  },
  location: {
    type: String,
    required: [true, 'Agency location is required']
  },
  description: {
    type: String,
    required: [true, 'Agency Description is required']
  },
  approved: {
    type: Boolean,
    default: false
  }
});

agencySchema.plugin(AutoIncrement, {inc_field: 'agencyId'});

module.exports = mongoose.model('Agency', agencySchema);