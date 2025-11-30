const express = require('express');
const nurseFormsController = require('../controllers/nurse-forms-controller');
const auth = require('../middlewares/auth-middlewares');

const router = express.Router();


router.post(
  '/nurse-services-delivery-forms', 
  auth.authenticate, auth.authorize('director'),
  nurseFormsController.createNursingServiceDeliveryForm);

router.post(
  '/nurse-services-checklist-forms', 
  auth.authenticate, auth.authorize('director'),
  nurseFormsController.createNursingServiceChecklistForm);

router.post(
  '/nursing-tasks-screening-forms', 
  auth.authenticate, auth.authorize('director'),
  nurseFormsController.createNursingTasksScreeningForm);

router.post(
  '/exclusion-host-home-forms',
  auth.authenticate, auth.authorize('nurse'), 
  nurseFormsController.addNurseToModel,
  nurseFormsController.createExclusionHostForm);

router.post(
  '/rn-delegation-checklist-forms',
  auth.authenticate,
  nurseFormsController.createRNDelegationChecklistForm);

router.post(
  '/comprehensive-nursing-assessment-forms',
  auth.authenticate,
  nurseFormsController.createComprehensiveNursingAssessmentForm);



//////////// PROGRAM DIRECTOR ROUTES ///////////////


module.exports = router;