const mongoose = require('mongoose');

const dayHabilitationServiceSchema = new mongoose.Schema({
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
    required: [true, 'Local Case Number of Service is required'],
    unique: true
  },
  days:[
    {
      dayName: {
        type: String,
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        required: [true, 'Day name is required']
      },
      dateOfWeek: {type: Date, required: [true, 'Date is required']},
      times:{
        morningTimes: {
          timeIn: {type: String, required: [true, 'Time in is required']},
          timeOut: {type: String, required: [true, 'Time out is required']},
        },
        afternoonTimes:{
          timeIn: {type: String, required: [true, 'Time in is required']},
          timeOut: {type: String, required: [true, 'Time out is requireddd']},
        },
        eveningTimes: {
          timeIn: {type: String, required: [true, 'Time in is required']},
          timeOut: {type: String, required: [true, 'Time out is required']},
        }
      },
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
        initials: {type: String, required: [true, 'Initials is required']}
      }
  }]
});

dayHabilitationServiceSchema.pre(/^find/, function(next){
  this.populate({ path: 'consumer', select: 'firstName lastName' });
  next();
});

module.exports = mongoose.model('DayHabilitationService', dayHabilitationServiceSchema);