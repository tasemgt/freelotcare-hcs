const mongoose = require('mongoose');
const generalUtils = require('../../utils/generals');

const supportedEmploymentSchema = new mongoose.Schema({
  consumer:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consumer',
    required: [true, 'A consumer is required']
  },
  lcNumber: {
    type: String,
    required: [true, 'Local Case Number of Service is required']
  },
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A staff is required']
  },
  agency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agency',
    required: [true, 'An Agency is required']
  },
  records:[
    {
      dateOfService: {
        type: Date,
        required: [true, 'Service date is required']
      },
      beginTime: {
       morning: {type: String, required: [true, 'Morning Begin time is required']},
       evening: {type: String, required: [true, 'Evening Begin time is required']}
      },
      endTime: {
        morning: {type: String, required: [true, 'Morning End time is required']},
        evening: {type: String, required: [true, 'Evening End time is required']}
      },
      location: {
        type: String,
        required: [true, 'Location is required']
      },
      staffSignature:{
        type: String,
        required: [true, 'Staff Signature is required']
      },
      servicesCode:{
        type: String,
        required: [true, 'Services Code is required']
      }
    }
  ],
  comments : [{
    commentDate: {type: Date},
    staffInitials: {type: String},
    commentText: {type: String},
  }]
},{
  toJSON: { virtuals: true },
  toObject: { virtuals: true}
});

// supportedEmploymentSchema.virtual('total_time').get(function(){
//   return Number((generalUtils.getTimeDifference(this.beginTime.morning, this.endTime.morning)) + 
//     Number(generalUtils.getTimeDifference(this.beginTime.evening, this.endTime.evening))
//   );
// });

supportedEmploymentSchema.pre(/^find/, function(next){
  this.populate({ path: 'consumer', select: 'firstName lastName' });
  next();
});

// supportedEmploymentSchema.pre('validate', function(next) {
//   if (this.records > 10) throw("todoList exceeds maximum array size (10)!");
//   next();
// });

module.exports = mongoose.model('SupportedEmployment', supportedEmploymentSchema);