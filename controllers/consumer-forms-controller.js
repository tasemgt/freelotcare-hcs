const DentalExam = require('../models/form/dental');
const HotWaterFireForm = require('../models/form/hot-water-fire-form');
const FireEmergencyForm = require('../models/form/fire-emergency-form');
const EnvChecklistForm = require('../models/form/environmental-checklist-form');
const poisonAssmentForm = require('../models/form/poison-assessment-form');
const legalAssessmentForm = require('../models/form/legal-assessment-form');

const RespiteServiceForm = require('../models/delivery-log/respite-service-form');
const supportedHomeForm = require('../models/delivery-log/supported-home-living-form');
const supportedHomeRecordForm = require('../models/delivery-log/supported-home-living-record');
const SupportedEmploymentForm = require('../models/delivery-log/supported-employment-form');
const RssSLServiceForm = require('../models/delivery-log/rss-sl-service-form');
const RssSLServiceWeekForm = require('../models/delivery-log/rss-sl-service-week-form');
const DayHabilitationForm = require('../models/delivery-log/day-habilitation-service-form');

const PrnMedicationList = require('../models/form/_prn-medication-list');
const ConsentMedicalInfo = require('../models/form/_consent-medical-info');

const Consumer = require('../models/consumer');
const factory = require('./handler-factory');
const AppError  = require('../utils/app-error');


/// ------------ Body Middlewares ----------------------//
exports.getConsumerFromLcNum = async(req, res, next) =>{
  try {
    const consumer = await Consumer.findOne({lcNumber:req.body.lcNumber});
    if(!consumer){
      return next(new AppError('No Consumer found with provided Local Case Number', 404));
    }
    if(!(consumer.agency._id.toString() === req.user.agency._id.toString())){
      return next(new AppError('Consumer with such Local Case Number isn\'t registered with your agency ', 403));
    }
    req.body.consumer = consumer._id;
    req.consumer = consumer;
    req.body.signatoryName = `${req.user.firstName} ${req.user.lastName}`;
    req.body.agency = req.user.agency._id;
    req.body.signatory = req.user._id;
    req.body.staff = req.user._id;
    next();
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
}

exports.createSupportedHomeRecord = async(req, res, next) =>{
  try{
    const { records } = req.body;
    if(records){
      const recordIDs = [];
      records.forEach((item) =>{
        item.staffSignature = `${req.user.firstName} ${req.user.lastName}`;
      });
      const newRecords = await supportedHomeRecordForm.insertMany(records);
      newRecords.forEach((record) =>{
        recordIDs.push(record._id);
      });
      req.body.records = recordIDs;
    }
    next();
  }catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
}

exports.addStaffToRecords = async(req, res, next) =>{
  try {
    const {records} = req.body;
    if(records){
      records.forEach((record) =>{
        record.staffSignature = `${req.user.firstName} ${req.user.lastName}`;
      });
      req.body.records = records;
    }
    next();
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
}


exports.createRSSSLServiceWeek = async(req, res, next) =>{
  try {
    const form = await RssSLServiceForm.findOne({lcNumber:req.body.lcNumber});
    if(form) return next(new AppError('Consumer already has a record, please click edit on the forms list to update a record instead'));
    const week = await RssSLServiceWeekForm.create(req.body.week);
    req.body.week = week._id;
    next();
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
}

exports.uniqueForms = Model => async(req, res, next) =>{
  console.log('UNIQUE FORMS');
  try {
    const form = await Model.findOne({lcNumber:req.body.lcNumber});
    if(form){
      return next(new AppError('Consumer already has a record, please click edit on the forms list to update a record instead', 400));
    }
    next();
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
}
//End of Middlewares


//Basic Consumer Forms Section------

// Dental Exam Form
exports.createDentalExam = factory.createOne(DentalExam);
// Handles Hot Water Assessment and Fire Evacuation Forms
exports.createHotWaterFireForm = factory.createOne(HotWaterFireForm);
// Fire Emergency Drill Form
exports.createFireEmergencyForm = factory.createOne(FireEmergencyForm);
// Environmental Checklist Form
exports.createEnvironmentalForm = factory.createOne(EnvChecklistForm);
// Poison Assessment Form
exports.createPoisonAssessmentForm = factory.createOne(poisonAssmentForm);
// Legal Assessment Form
exports.createLegalAssessmentForm = factory.createOne(legalAssessmentForm); 


//Consumer Forms Delivery Logs Section----------

// Respite Service Delivery Form
exports.createRespiteServiceDeliveryForm = factory.createOne(RespiteServiceForm);

exports.createSupportedHomeForm = factory.createOne(supportedHomeForm);

exports.createSupportedEmploymentForm = factory.createOne(SupportedEmploymentForm);

exports.createRSSSLServiceForm = factory.createOne(RssSLServiceForm);

exports.createDayHabilitationForm = factory.createOne(DayHabilitationForm);

exports.createPrnMedicationList = factory.createOne(PrnMedicationList);

exports.createConsentMedicalInfo = factory.createOne(ConsentMedicalInfo);


//Update Consumer Forms

exports.updateSupportedEmploymentForm = async(req, res, next) =>{
  try{
    const document = await SupportedEmploymentForm.findById(req.params.id);
    if(!document){
      return next(new AppError('No resource found with that ID', 404));
    }

    const {records, comments} = req.body;

    if(records){
      records.forEach((record) =>{
        document.records.push(record);
      });
    }
    if(comments){
      comments.forEach((comment) =>{
        document.comments.push(comment);
      });
    }

    const form = await document.save();

    res
    .status(200)
    .json({
      status: 'success',
      data: form
    });
  }
  catch(err){
    res.status(500).json({
      status: 'fail',
      message: err
    });
  } 
};

exports.updateSupportedHomeForm = async(req, res, next) =>{
  try{
    const document = await supportedHomeForm.findById(req.params.id);
    if(!document){
      return next(new AppError('No resource found with that ID', 404));
    }

    const {records, comments} = req.body;
    
    if(records.length){
      records.forEach((record) =>{
        document.records.push(record);
      });
    }
    
    if(comments){
      comments.forEach((comment) =>{
        document.comments.push(comment);
      });
    }
    const form = await document.save();
    res
    .status(200)
    .json({
      status: 'success',
      data: form
    });
  }
  catch(err){
    res.status(500).json({
      status: 'fail',
      message: err
    });
  } 
};