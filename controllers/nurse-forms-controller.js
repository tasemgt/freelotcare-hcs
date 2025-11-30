const NursingServiceDeliveryForm = require('../models/nurse-form/nursing-service-delivery-form');
const NursingServiceChecklistForm = require('../models/nurse-form/nursing-service-checklist-form');
const NursingTasksScreeningForm = require('../models/nurse-form/nursing-tasks-screening-form');
const ExclusionHostForm = require('../models/nurse-form/exclusion-form');
const RnDelegationChecklistForm = require('../models/nurse-form/rn-delegation-checklist-form');
const ComprehensiveNursingAssessmentForm = require('../models/nurse-form/comprehensive-nursing-assessment-form');

const factory = require('./handler-factory');
const AppError  = require('../utils/app-error');


// Middlewares---------------
exports.addNurseToModel = (req, res, next) =>{
  try {
    req.body.nameAndCred = req.user._id;
    next();
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
}


exports.createNursingServiceDeliveryForm = factory.createOne(NursingServiceDeliveryForm);
exports.createNursingServiceChecklistForm = factory.createOne(NursingServiceChecklistForm);
exports.createNursingTasksScreeningForm = factory.createOne(NursingTasksScreeningForm);
exports.createExclusionHostForm = factory.createOne(ExclusionHostForm);
exports.createRNDelegationChecklistForm = factory.createOne(RnDelegationChecklistForm);
exports.createComprehensiveNursingAssessmentForm = factory.createOne(ComprehensiveNursingAssessmentForm);