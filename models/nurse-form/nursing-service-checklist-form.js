const mongoose = require('mongoose');

const nursingServiceChecklistSchema = new mongoose.Schema({
  descriptions: [{
    title: { type:String },
    items: [{ 
      title: { type:String },
      checked: { type:String },
      kids: [{
        title: { type:String },
        checked: { type:String },
      }]
    }]
  }]
});


module.exports = mongoose.model('nursingServiceChecklist', nursingServiceChecklistSchema);