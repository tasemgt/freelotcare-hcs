const express = require('express');
const directorFormsController = require('../controllers/director-forms-controller');
const consumerFormsController = require('../controllers/consumer-forms-controller')
const auth = require('../middlewares/auth-middlewares');

const ExclusionScheduleForm = require('../models/director-form/exclusion-schedule-form');
const DebarVendorForm = require('../models/director-form/debar-vendor-form');
const CriticalIncidentForm = require('../models/director-form/critical-incident-form');

const router = express.Router();


router.post(
  '/exclusion-schedule-forms', 
  auth.authenticate, auth.authorize('director'),
  directorFormsController.addFieldsToCreate,
  directorFormsController.createExclusionScheduleForm);

router.patch(
  '/exclusion-schedule-forms/:id', 
  auth.authenticate, auth.authorize('director'),
  directorFormsController.addRecord(ExclusionScheduleForm, 'month'),
  directorFormsController.updateExclusionScheduleForm
  );

router.post(
  '/debar-vendor-forms', 
  auth.authenticate, auth.authorize('director'),
  directorFormsController.addFieldsToCreate,
  directorFormsController.createDebarVendorForm);

router.patch(
  '/debar-vendor-forms/:id', 
  auth.authenticate, auth.authorize('director'),
  directorFormsController.addRecord(DebarVendorForm, 'quarter'),
  directorFormsController.updateDebarVendorForm
  );

router.post(
  '/critical-incident-forms', 
  auth.authenticate, auth.authorize('director'),
  directorFormsController.addFieldsToCreate,
  directorFormsController.createCriticalIncidentForm);

router.patch(
  '/critical-incident-forms/:id', 
  auth.authenticate, auth.authorize('director'),
  directorFormsController.addRecord(CriticalIncidentForm, 'month'),
  directorFormsController.updateCriticalIncidentForm
  );

router.post(
  '/consumer-satisfaction-forms', 
  auth.authenticate, auth.authorize('director'),
  consumerFormsController.getConsumerFromLcNum,
  directorFormsController.createConsumerSatisfactionForm);

router.post(
  '/notice-advisory', 
  auth.authenticate, auth.authorize('director'),
  directorFormsController.addDirectorToCreate,
  directorFormsController.createNoticeForAdvisoryCommitteeForm);

router.post(
  '/dental-summary-forms', 
  auth.authenticate, auth.authorize('director'),
  directorFormsController.addDirectorToCreate,
  directorFormsController.createDentalSummarySheetForm);

router.post(
  '/minor-adaptive-summary-forms', 
  auth.authenticate, auth.authorize('director'),
  directorFormsController.addDirectorToCreate,
  directorFormsController.createMinorAdaptiveSummarySheetForm);

module.exports = router;