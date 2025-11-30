const express = require('express');
const viewController = require('../controllers/view-controller');
const auth = require('../middlewares/auth-middlewares');

const fileUpload = require('../utils/file_upload');


const router = express.Router();

const employmentDocs = [
  {name: 'id_card', maxCount: 1},
  {name: 'ss_card', maxCount: 1},
  {name: 'highSchool_cert', maxCount: 1}
]

//Login Routes
router.get('/', viewController.root);
router.get('/login', viewController.loginPage);

//Register an agency/Program Director routes
router.get('/agency', viewController.agencyFormPage);
router.post('/agency', viewController.submitAgencyReg);
router.get('/agency/:agencyId', auth.authenticate, auth.authorize('admin'), viewController.getAgencyByAgencyId);
router.patch('/agency/:id', auth.authenticate, auth.authorize('admin'), viewController.approveAgency);

router.get('/dashboard/directors/director-services', auth.authenticate, auth.authorize('director'), viewController.getDirectorServicesPage);
router.get('/dashboard/directors/exclusion-info', auth.authenticate, auth.authorize('director'), viewController.getExclusionInfoPage);
router.get('/dashboard/directors/exclusion-schedule', auth.authenticate, auth.authorize('director'), viewController.exclusionSchedulePage);
router.get('/dashboard/directors/debar-info', auth.authenticate, auth.authorize('director'), viewController.getDebarInfoPage);
router.get('/dashboard/directors/debar-vendor', auth.authenticate, auth.authorize('director'), viewController.debarVendorPage);
router.get('/dashboard/directors/critical-incident', auth.authenticate, auth.authorize('director'), viewController.criticalIncidentPage);
router.get('/dashboard/directors/consumer-satisfaction', auth.authenticate, auth.authorize('director'), viewController.consumerSatisfactionPage);
router.get('/dashboard/directors/notice-advisory', auth.authenticate, auth.authorize('director'), viewController.noticeForAdvisoryCommitteePage);
router.get('/dashboard/directors/minutes-sample', auth.authenticate, auth.authorize('director'), viewController.getMinutesSamplePage);
router.get('/dashboard/directors/dental-summary', auth.authenticate, auth.authorize('director'), viewController.dentalSummarySheetPage);
router.get('/dashboard/directors/minor-adaptive-summary', auth.authenticate, auth.authorize('director'), viewController.minorHomeAdaptiveAidsSummaryPage);


//Submit a job/employment application routes
router.get('/employment', viewController.employmentFormPage);
router.post('/employment',
  fileUpload.multerPdf(employmentDocs),
  viewController.setDocumentIDs,
  viewController.awsS3Upload,
  viewController.submitEmployment
);
router.get('/employment/:applicationId', auth.authenticate, auth.authorize('director'), viewController.getEmployment);
router.patch('/employment/:id', auth.authenticate, auth.authorize('director'), viewController.updateEmployment);

// Dashboard area
router.get('/dashboard', auth.authenticate, viewController.dashboardPage);
router.get('/dashboard/users', auth.authenticate, auth.authorize('admin'), viewController.allUsersPage);
router.get('/dashboard/users/add', auth.authenticate, auth.authorize('director'), viewController.addUserPage);
router.get('/dashboard/users/add-program-director', auth.authenticate, auth.authorize('admin'), viewController.addDirectorPage);
router.get('/dashboard/users/:id', auth.authenticate, auth.authorize('admin', 'director'), viewController.userDetailsPage);

router.get('/dashboard/appointments', auth.authenticate, viewController.getAllAppointmentsPage);
router.get('/dashboard/appointments/add', auth.authenticate, viewController.appointmentFormPage);
router.get('/dashboard/profile', auth.authenticate, viewController.profilePage);
router.get('/dashboard/settings/change-password', auth.authenticate, viewController.changeUserPassword);
router.get('/dashboard/error', auth.authenticate, viewController.getErrorPage);

router.get('/dashboard/agency-applications', auth.authenticate, auth.authorize('admin'), viewController.getAllAgencyApplicationsPage);
router.get('/dashboard/agency-applications/:id', auth.authenticate, auth.authorize('admin'), viewController.getAgencyApplicationDetailsPage);

router.get('/dashboard/applications', auth.authenticate, auth.authorize('director'), viewController.getAllApplicationsPage);
router.get('/dashboard/applications/download', auth.authenticate, auth.authorize('director'), fileUpload.downloadDocument);
router.get('/dashboard/applications/:id', auth.authenticate, auth.authorize('director'), viewController.getApplicationDetailsPage);


//Consumers section
router.get('/dashboard/consumers', auth.authenticate, viewController.getAllConsumers);

// Consumer forms routes
router.get('/dashboard/consumer-forms', auth.authenticate, viewController.getAllConsumerForms);
router.get('/dashboard/consumers/dental-form', auth.authenticate, viewController.dentalFormPage);
router.get('/dashboard/consumers/hot-water-form', auth.authenticate, viewController.hotWaterFormPage);
router.get('/dashboard/consumers/fire-evac-form', auth.authenticate, viewController.fireEvacFormPage);
router.get('/dashboard/consumers/fire-emergency-form', auth.authenticate, viewController.fireEmergencyFormPage);
router.get('/dashboard/consumers/environmental-checklist-form', auth.authenticate, viewController.environmentalChecklistFormPage);
router.get('/dashboard/consumers/poison-assessment-form', auth.authenticate, viewController.poisonAssessmentFormPage);
router.get('/dashboard/consumers/legal-assessment-form', auth.authenticate, viewController.legalAssessmentFormPage);
//---------------------------------------------------------------------------------------------------------//
router.get('/dashboard/consumers/respite-service-delivery', auth.authenticate, viewController.respiteServiceDeliveryPage);
router.get('/dashboard/consumers/supported-home-living', auth.authenticate, viewController.supportedHomeLivingPage);
router.get('/dashboard/consumers/supported-employment', auth.authenticate, viewController.supportedEmploymentPage);
router.get('/dashboard/consumers/rss-sl-service', auth.authenticate, viewController.rssSLServicePage);
router.get('/dashboard/consumers/day-habilitation-service', auth.authenticate, viewController.dayHabilitationServicePage);
router.get('/dashboard/consumers/prn-medication-lists', auth.authenticate, viewController.prnMedicationListPage);
router.get('/dashboard/consumers/consent-medical-info', auth.authenticate, viewController.consentMedicalInfoPage);

router.get('/dashboard/consumers/supported-home-living/:id', auth.authenticate, viewController.supportedHomeLivingDetailsPage);
router.get('/dashboard/consumers/supported-employment/:id', auth.authenticate, viewController.supportedEmploymentDetailsPage);

//Consumer routes
router.get('/dashboard/consumers/add', auth.authenticate, auth.authorize('director'), viewController.registerConsumerPage);
router.get('/dashboard/consumers/download', auth.authenticate, auth.authorize('director'), fileUpload.downloadDocument);
router.get('/dashboard/consumers/:id', auth.authenticate, auth.authorize('admin','director'), viewController.getConsumerDetailsPage);


//Your Staff secion (Nurses/Caregivers)
router.get('/dashboard/staff', auth.authenticate, auth.authorize('director'), viewController.myStaffPage);

router.get('/dashboard/nurses/nursing-services', auth.authenticate, auth.authorize('nurse'), viewController.getNursingServicesPage);

// Nurses forms section
router.get('/dashboard/nurses/nursing-service-delivery', auth.authenticate, auth.authorize('admin', 'director'), viewController.nursingServicesDeliveryPage);
router.get('/dashboard/nurses/nursing-service-checklist', auth.authenticate, auth.authorize('admin', 'director'), viewController.nursingServicesChecklistPage);
router.get('/dashboard/nurses/nursing-tasks-screening', auth.authenticate, auth.authorize('admin', 'director'), viewController.nursingTasksScreeningPage);
router.get('/dashboard/nurses/exclusion-of-hhcc', auth.authenticate, auth.authorize('admin', 'director', 'nurse'), viewController.nursingExclusionOfHostHomePage);
router.get('/dashboard/nurses/rn-delegation-checklist', auth.authenticate, auth.authorize('admin', 'director'), viewController.rnDelegationChecklistPage);
router.get('/dashboard/nurses/comprehensive-nursing-assessment', auth.authenticate, auth.authorize('admin', 'director'), viewController.comprehensiveNursingAssessmentPage);




module.exports = router;