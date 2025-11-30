const express = require('express');
const consumerFormsController = require('../controllers/consumer-forms-controller');
const auth = require('../middlewares/auth-middlewares');

const DayHabilitationForm = require('../models/delivery-log/day-habilitation-service-form');
const SupportedHomeForm = require('../models/delivery-log/supported-home-living-form');
const SupportedEmploymentForm = require('../models/delivery-log/supported-employment-form');

const router = express.Router();

router.post(
  '/dental-exam', 
  auth.authenticate, 
  consumerFormsController.getConsumerFromLcNum,
  consumerFormsController.createDentalExam);

router.post(
  '/hot-water-fire-form', 
  auth.authenticate, 
  consumerFormsController.getConsumerFromLcNum,
  consumerFormsController.createHotWaterFireForm);

router.post(
  '/fire-emergency-form', 
  auth.authenticate, 
  consumerFormsController.getConsumerFromLcNum,
  consumerFormsController.createFireEmergencyForm);

router.post(
  '/environmental-checklist-form', 
  auth.authenticate,
  consumerFormsController.getConsumerFromLcNum,
  consumerFormsController.createEnvironmentalForm);

router.post(
  '/poison-assessment-form', 
  auth.authenticate,
  consumerFormsController.getConsumerFromLcNum,
  consumerFormsController.createPoisonAssessmentForm);

router.post(
  '/legal-assessment-form', 
  auth.authenticate,
  consumerFormsController.getConsumerFromLcNum,
  consumerFormsController.createLegalAssessmentForm);

// ....................................//
router.post(
  '/respite-service-forms', 
  auth.authenticate, 
  consumerFormsController.getConsumerFromLcNum, 
  consumerFormsController.createRespiteServiceDeliveryForm);

router.post(
  '/supported-home-forms', 
  auth.authenticate, 
  consumerFormsController.getConsumerFromLcNum, 
  consumerFormsController.uniqueForms(SupportedHomeForm),
  consumerFormsController.createSupportedHomeRecord,
  consumerFormsController.createSupportedHomeForm);

router.patch(
  '/supported-home-forms/:id', 
  auth.authenticate,
  consumerFormsController.createSupportedHomeRecord,
  consumerFormsController.updateSupportedHomeForm);

router.post('/supported-employment-forms',
    auth.authenticate, 
    consumerFormsController.getConsumerFromLcNum,
    consumerFormsController.uniqueForms(SupportedEmploymentForm),
    consumerFormsController.addStaffToRecords,
    consumerFormsController.createSupportedEmploymentForm
);

router.patch('/supported-employment-forms/:id',
    auth.authenticate, 
    consumerFormsController.addStaffToRecords,
    consumerFormsController.updateSupportedEmploymentForm
);

router.post(
  '/rss-sl-service-forms',
  auth.authenticate,
  consumerFormsController.getConsumerFromLcNum,
  consumerFormsController.createRSSSLServiceWeek,
  consumerFormsController.createRSSSLServiceForm
);

router.post(
  '/day-habilitation-forms',
  auth.authenticate,
  consumerFormsController.getConsumerFromLcNum,
  consumerFormsController.uniqueForms(DayHabilitationForm),
  consumerFormsController.createDayHabilitationForm
);

router.post(
  '/prn-medication-lists', 
  auth.authenticate, 
  consumerFormsController.getConsumerFromLcNum, 
  consumerFormsController.createPrnMedicationList);

router.post(
  '/consent-medical-infos', 
  auth.authenticate, 
  consumerFormsController.getConsumerFromLcNum, 
  (req, res, next) =>{ 
    req.body.dob = req.consumer.dob;
    next();
  },
  consumerFormsController.createConsentMedicalInfo);

module.exports = router;