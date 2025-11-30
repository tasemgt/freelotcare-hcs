const ExclusionScheduleForm = require('../models/director-form/exclusion-schedule-form');
const DebarVendorForm = require('../models/director-form/debar-vendor-form');
const CriticalIncidentForm = require('../models/director-form/critical-incident-form');
const ConsumerSatisfactionForm = require('../models/director-form/consumer-satisfaction-form');
const NoticeForAdvisoryCommitteeForm = require('../models/director-form/notice-for-advisory-committee-form');
const DentalSummarySheetForm = require('../models/director-form/dental-summary-sheet-form');
const MinorAdaptiveSummarySheetForm = require('../models/director-form/minor-home-adaptive-aids-summary-sheet-form');

const factory = require('./handler-factory');


// Middlewares---------------
exports.addFieldsToCreate = (req, res, next) =>{
  req.body.year = new Date().getFullYear();
  req.body.director = req.user._id;
  if(req.body.months){
    req.body.months[0].signature = req.user._id;
  }else{
    req.body.quarters[0].signature = req.user._id;
  }
  next()
}

exports.addDirectorToCreate = (req, res, next) =>{
  req.body.director = req.user._id;
  next();
}

exports.addRecord = (Model, type) => async (req, res, next) =>{
  const prop = type === 'month' ? req.body.months[0]: req.body.quarters[0];
  const resp = await factory.getOneDocument(Model, {_id: req.params.id});
  const form = resp[0];
  prop.signature = req.user._id;
  // form.year = req.body.year;
  if(type === 'month'){
    form.months.push(prop)
  }else{
    form.quarters.push(prop);
  }
  req.body.form = form;
  next();
}

exports.updateScheduleForms = Model => async(req, res) =>{
  try{
    const form =  await req.body.form.save();
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
}

exports.createExclusionScheduleForm = factory.createOne(ExclusionScheduleForm);

exports.updateExclusionScheduleForm = this.updateScheduleForms(ExclusionScheduleForm);

exports.createDebarVendorForm = factory.createOne(DebarVendorForm);

exports.updateDebarVendorForm = this.updateScheduleForms(DebarVendorForm);

exports.createCriticalIncidentForm = factory.createOne(CriticalIncidentForm);

exports.updateCriticalIncidentForm = this.updateScheduleForms(CriticalIncidentForm);

exports.createConsumerSatisfactionForm = factory.createOne(ConsumerSatisfactionForm);

exports.createNoticeForAdvisoryCommitteeForm = factory.createOne(NoticeForAdvisoryCommitteeForm);

exports.createDentalSummarySheetForm = factory.createOne(DentalSummarySheetForm);

exports.createMinorAdaptiveSummarySheetForm = factory.createOne(MinorAdaptiveSummarySheetForm);