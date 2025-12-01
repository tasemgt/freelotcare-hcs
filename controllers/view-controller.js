const async = require('async');
const User = require('../models/user/user');
const Staff = require('../models/user/staff');
const Director = require('../models/user/director');
const Consumer = require('../models/consumer');
const ConsumerForm = require('../models/form/consumer-form');
const Employment = require('../models/employment');
const Agency = require('../models/agency');
const Appointment = require('../models/appointment');

const RespiteServiceForm = require('../models/delivery-log/respite-service-form');
const SupportedHomeLivingForm = require('../models/delivery-log/supported-home-living-form');
const SupportedEmploymentForm = require('../models/delivery-log/supported-employment-form');
const RssSLServiceForm = require('../models/delivery-log/rss-sl-service-form');
const DayHabilitationForm = require('../models/delivery-log/day-habilitation-service-form');
const PrnMedicationList = require('../models/form/_prn-medication-list');
const ConsentMedicalInfo = require('../models/form/_consent-medical-info');

// Static Data for use in pages
const EnvChecklistData = require('../models/data/environmental-checklist-data');
const respiteActivities = require('../models/data/respite-activities');
const rssActivities = require('../models/data/rss-activities');
const habilitationAreas = require('../models/data/habilitation-areas');
const nursingServiceDescriptions = require('../models/data/nursing-service-description');
const nursingServiceChecklistData = require('../models/data/nursing-service-checklist-data');
const nursingTasksScreeningData = require('../models/data/nursing-tasks-screening-data');
const rnDelegationChecklistData = require('../models/data/rn-delegation-checklist-data');
const comprehensiveNursingAssessmentData = require('../models/data/comprehensive-nursing-assessment-data');
const addConsumerServices = require('../models/data/add-consumer-services-data');
const consumerSatisfactionData = require('../models/data/consumer-satisfaction-review-data');

// Nurse Models
const NursingServiceDeliveryForm = require('../models/nurse-form/nursing-service-delivery-form');
const NursingServiceChecklistForm = require('../models/nurse-form/nursing-service-checklist-form');
const NursingTasksScreeningForm = require('../models/nurse-form/nursing-tasks-screening-form');
const ExclusionHostForm = require('../models/nurse-form/exclusion-form');
const RNDelegationChecklistForm = require('../models/nurse-form/rn-delegation-checklist-form');
const ComprehensiveNursingAssessmentForm = require('../models/nurse-form/comprehensive-nursing-assessment-form');

//Director Models
const ExclusionScheduleForm = require('../models/director-form/exclusion-schedule-form');
const DebarVendorListForm = require('../models/director-form/debar-vendor-form');
const CriticalIncidentReportForm = require('../models/director-form/critical-incident-form');
const ConsumerSatisfactionReviewForm = require('../models/director-form/consumer-satisfaction-form');
const NoticeForAdvisoryCommitteeForm = require('../models/director-form/notice-for-advisory-committee-form');
const DentalSummarySheetForm = require('../models/director-form/dental-summary-sheet-form');
const MinorHomeAdaptiveAidsSummaryPage = require('../models/director-form/minor-home-adaptive-aids-summary-sheet-form');

const factory = require('./handler-factory');

const AppError  = require('../utils/app-error');
const fileUpload = require('../utils/file_upload');
// const sms = require('../utils/sms');

const generalUtils = require('../utils/generals');
const user = require('../models/user/user');

const sendEmail = require('../utils/email');

const {createS3Params} = fileUpload;

exports.setDocumentIDs = (req, res, next) =>{
  const {ssn} = req.body;
  const agencyID = req.body.agency;

  req.files.id_card[0].key = `employment_applications/${agencyID}/${ssn}/idCard.pdf`;
  req.files.ss_card[0].key = `employment_applications/${agencyID}/${ssn}/ssCard.pdf`;
  req.files.highSchool_cert[0].key = `employment_applications/${agencyID}/${ssn}/highSchoolCert.pdf`;

  next();
}

exports.awsS3Upload = async (req, res, next) =>{
  const s3 = fileUpload.aws();
  const files = {...req.files};

  const idCard = createS3Params(files.id_card[0]);
  const ssCard = createS3Params(files.ss_card[0]);
  const highSchoolCert = createS3Params(files.highSchool_cert[0]);

  try{
      const response = await Promise.all([
        s3.upload(idCard).promise(),
        s3.upload(ssCard).promise(),
        s3.upload(highSchoolCert).promise()
      ]);
      
      //Set the keys in the body
      req.body.idCard = {
        file: response[0].Key,
        expiry: req.body.idCardExpiry
      };
      req.body.ssCard = response[1].Key;
      req.body.highSchoolCert = response[2].Key;

      next();
  }
  catch(err){
    return new AppError(`Failed to upload your documents to server`, 500);
  }
}



const getDocuments = async (Model, query) =>{
  try {
    const documents = query? await Model.find(query) : await Model.find({});
    return documents;
  } 
  catch (err) {
    return new AppError(err, 404);
  }
}

const getOneDocument = async (Model, query) =>{
  try {
    const document = query? await Model.find(query) : null;
    return document;
  } 
  catch (err) {
    return new AppError(err, 404);
  }
}


////////  Handler functions ////////////

//-- Auth Pages Handlers --//
exports.loginPage = (req, res) =>{
  res.status(200).render('login', {
    title: 'Login'
  });
}

exports.root = (req, res) =>{
  res.status(200).redirect('/dashboard');
}


//-- Dashboard Page Handlers --//
exports.dashboardPage = async(req, res) =>{
  const users = await getDocuments(User);
  const consumerForms = await getDocuments(ConsumerForm);
  const appointments = await getDocuments(Appointment);
  res.status(200).render('dashboard/dashboard', {
    title: 'Dashboard',
    totalUsers: users.length,
    totalConsumerForms: consumerForms.length,
    totalAppointments: appointments.length
  });
};


//-- Agency Application Handlers --//
exports.agencyFormPage = (req, res) =>{
  res.status(200).render('agency', {
    title: 'Enroll an Agency'
  });
}

exports.submitAgencyReg = async(req, res) =>{
  try {
    const agency = await Agency.create(req.body);

    console.log('New Agency: ', agency);

    //Send email
    sendEmail({
      email: req.body.email,
      subject: 'Agency Enrollment Received',
      message: `Hello ${agency.name}, \n\nThanks for enrolling into our platform. Here is your enrollment ID: ${agency.agencyId}.\n\nKindly note that this ID is required to complete your registration into the system. \n\nBest Regards,\nFree Lot Care Team`
    });

    //Send sms
    // await sms.sendSMS(`${req.body.phone}`, '--------', // process.env.TWILIO_PHONE, 
    // `Hello ${agency.name}, \nThanks for enrolling into our platform. Your enrollment ID is '${agency.agencyId}'.\nThis ID is required to complete your registeration into the system. \nRegards.`)

    res.status(201).json({
      status: 'success',
      message: 'Application submitted successfully!',
      data: {
        agency
      }
    });

  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
}

exports.getAllAgencyApplicationsPage = async(req, res, next) =>{
  try {
    const agencies = await Agency.find();
    res.status(200).render('dashboard/agency-applications/all-agency-applications', {
      title: 'Agency Enrollment Applications',
      agencies
    });

  } catch (err) {
    return next(new AppError(err, 404));
  }
}

exports.getAgencyApplicationDetailsPage = async(req, res, next) =>{
  try {
    const agency = await Agency.findById(req.params.id);
    res.status(200).render('dashboard/agency-applications/agency-application-details', {
      title: `${agency.name}'s Application`,
      agency
    });

  } catch (err) {
    return next(new AppError(err, 404));
  }
}

exports.getAgencyByAgencyId = async(req, res, next) =>{
  try {
    let agency;
    if(req.query.approved !== undefined){
      agency = await Agency.findOne({agencyId: req.params.agencyId, approved: req.query.approved});
    }
    else{
      agency = await Agency.findOne({agencyId: req.params.agencyId});
    }

    if(!agency){
      return next(new AppError('Application with provided ID doesn\'t exist or isn\'t approved yet', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        agency
      }
    });

  } catch (err) {
    return next(new AppError(err, 404));
  }
}

exports.approveAgency = async (req, res, next) =>{
  try{
    const agency = await Agency.findByIdAndUpdate(req.params.id, {approved: req.body.approved}, {
      new: true, //To return the updated document
      // runValidators: true
    });

    if(!agency){
      return next(new AppError('No agency with that ID', 404));
    }

    res
    .status(200)
    .json({
      status: 'success',
      data: agency
    });
  }
  catch(err){
    res.status(404).json({
      status: 'fail',
      message: err
    });
  } 
}

//-- Employment/Applications Handlers --//
exports.employmentFormPage = async(req, res) =>{
  const agencies = await Agency.find({approved: true});
  res.status(200).render('employment', {
    title: 'Employment Form',
    agencies
  });
}

exports.submitEmployment = async(req, res) =>{
  try {
    req.body.references = JSON.parse(req.body.references); //Parse to js object after converting from formData
    const employment = await Employment.create(req.body);
    
    //Send sms
    // await sms.sendSMS(`${req.body.phone}`, process.env.TWILIO_PHONE, 
    // `Hello ${employment.firstName}, \nThanks for your application. Your application ID is '${employment.applicationId}'.\nGive this ID to your Program Director for your enrollment into the system. \nRegards.`)

    //Send email
    sendEmail({
      email: req.body.email,
      subject: 'Thank You for Applying!',
      message: `Hello ${employment.firstName}, \n\nThanks for your application. Your application ID is '${employment.applicationId}'.\n\nGive this ID to your Program Director for your enrollment into the system. \n\nBest Regards,\nFree Lot Care Team`
    });

    res.status(201).json({
      status: 'success',
      data: {
        employment
      }
    });

  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
}

exports.getEmployment = async(req, res, next) =>{
  try {
    let application;
    if(req.query.approved !== undefined){
      application = await Employment.findOne({applicationId: req.params.applicationId, approved: req.query.approved});
    }
    else{
      application = await Employment.findOne({applicationId: req.params.applicationId});
    }

    if(!application){
      return next(new AppError('Application with provided ID doesn\'t exist or isn\'t approved yet', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        application
      }
    });

  } catch (err) {
    return next(new AppError(err, 404));
  }
}

exports.updateEmployment = async (req, res, next) =>{
  try{
    const application = await Employment.findByIdAndUpdate(req.params.id, {approved: req.body.approved}, {
      new: true, //To return the updated document
      // runValidators: true
    });

    if(!application){
      return next(new AppError('No resource found with that ID', 404));
    }

    res
    .status(200)
    .json({
      status: 'success',
      data: { data: application }
    });
  }
  catch(err){
    res.status(404).json({
      status: 'fail',
      message: err
    });
  } 
}


exports.getAllApplicationsPage = async(req, res, next) =>{
  try {
    const applications = await Employment.find({agency: req.user.agency});
    res.status(200).render('dashboard/applications/all-applications', {
      title: 'Job Applications',
      applications
    });

  } catch (err) {
    return next(new AppError(err, 404));
  }
}

exports.getApplicationDetailsPage = async(req, res, next) =>{
  try {
    const application = await Employment.findById(req.params.id);
    res.status(200).render('dashboard/applications/application-details', {
      title: `${application.firstName}'s Application`,
      application
    });

  } catch (err) {
    return next(new AppError(err, 404));
  }
}


//-- Appointments Handlers --//
exports.appointmentFormPage = (req, res) =>{
  res.status(200).render('dashboard/appointments/add-appointment', {
    title: 'Book an Appointment'
  });
}


exports.getAllAppointmentsPage = async(req, res, next) =>{
  const appointments = await getDocuments(Appointment);
  res.status(200).render('dashboard/appointments/all-appointments', {
    title: 'Appointment Bookings',
    appointments
  });
}

//-- Profile Page Handlers --//
exports.profilePage = async (req, res) =>{
  const us = await User.findById(req.user._id);
  res.status(200).render('dashboard/profile', {
    title: 'Profile',
    user: us
  });
};


//-- Users Management page handlers --//
exports.allUsersPage = async(req, res) =>{
  async.parallel({
    // directors: function(callback){
    //   User.find({role:'director'}, callback);
    // },
    directors: function(callback){
      Director.find({}, callback);
    },
    staff: function(callback){
      Staff.find({}, callback);
    }
  }, function(err, results) {
      const users = results.directors.concat(results.staff);
      console.log(users);
      res.status(200).render('dashboard/users/all-users', {
        title: 'Users Management',
        users
      });
  });
};

//Gets all staff i.e nurses/caregivers of an agency
exports.myStaffPage = async(req, res, next) =>{
  try{
    const staff = await Staff.find({'agency': req.user.agency._id});
    res.status(200).render('dashboard/users/all-users', {
      title: 'My Staff',
      users: staff
    });
  }
  catch(err){
    next(new AppError('An Error occured', 500));
  }
};

// Renders user/staff details page
exports.userDetailsPage = async (req, res, next) => {
  try{
    const person = await User.findById(req.params.id);
    //A Director is only allowed to see staff
    if(req.user.role === 'director' && ['admin', 'director'].includes(person.role)){
      next(new AppError('You are not Authorized to see this resource', 403));
    }
    res.status(200).render('dashboard/users/user-details', {
      title: `${person.firstName} ${person.lastName}`,
      person
    });
  }
  catch(err){
    //
  }
}

//Renders add new user (Staff) page
exports.addUserPage = (req, res) =>{
  res.status(200).render('dashboard/users/add-user', {
    title: 'Add New User'
  });
};

//Renders add new director page
exports.addDirectorPage = (req, res) =>{
  res.status(200).render('dashboard/agency-applications/add-agency', {
    title: 'Add Program Director'
  });
};


//Settings Area -->
exports.changeUserPassword = (req, res) =>{
  res.status(200).render('dashboard/settings/change-password', {
    title: 'Update User Password'
  });
};

//Error Page Handler -->
exports.getErrorPage = (req, res) =>{
  const { type } = req.query;
  const render = {};
  let code;

  if(type === 'not-found'){
    render.title = `Not Found.`;
    render.message = `Cannot find what you are looking for, sorry!`;
    code = 404;
  }
  else if(type === 'not-authorized'){
    render.title = `Not Authorized.`;
    render.message = `You are not Authorized to view this page, sorry!`;
    code = 403;
  }
  else if(type === 'server-error'){
    render.title = `Server Error`;
    render.message = `Sorry an error occured from our end, we'll fix it up so you can try again later!`;
    code = 500;
  }
  res.status(code).render('dashboard/error', render);
};


//-- Consumers and Consumer Forms Pages Handlers --//

// Consumers Create Form
exports.registerConsumerPage = (req, res) =>{
  res.status(200).render('dashboard/consumers/add-consumer', {
    title: 'Register a Consumer',
    services: addConsumerServices
  });
}

exports.getAllConsumers = async(req, res, next) =>{
  try {
    const docQuery = req.user.role === 'admin'? {}: {agency: req.user.agency._id}; 
    const consumers = await Consumer.find(docQuery);
    
    res.status(200).render('dashboard/consumers/all-consumers', {
      title: 'All Consumers',
      consumers
    });

  } catch (err) {
    return next(new AppError(err, 404));
  }
}

exports.getConsumerDetailsPage = async(req, res, next) =>{
  try {
    const consumer = await Consumer.findById(req.params.id);
    
    res.status(200).render('dashboard/consumers/consumer-details', {
      title: 'Consumer Details',
      consumer
    });

  } catch (err) {
    return next(new AppError(err, 404));
  }
}

//Gets all Simple Forms
exports.getAllConsumerForms = async(req, res, next) =>{
  try {
    const forms = await getDocuments(ConsumerForm, {agency: req.user.agency});
    console.log(forms);
    res.status(200).render('dashboard/consumers/completed-forms/all-completed-forms', {
      title: 'Basic Consumer Forms',
      forms
    });

  } catch (err) {
    return next(new AppError(err, 404));
  }
}


// Dental Form
exports.dentalFormPage = (req, res) =>{
  res.status(200).render('dashboard/consumers/form-views/dental-exam-form', {
    title: 'Dental Examination Form'
  });
}

// Hot water form
exports.hotWaterFormPage = (req, res) =>{
  res.status(200).render('dashboard/consumers/form-views/hot-water-fire-evac-form', {
    title: 'Hot Water Assessment Form',
    type: 'hot-water'
  });
}

// Fire Evac Form (Re-uses hot water form, with slight differences)
exports.fireEvacFormPage = (req, res) =>{
  res.status(200).render('dashboard/consumers/form-views/hot-water-fire-evac-form', {
    title: 'Fire Evacuation Assessment Form',
    type: 'fire-evac'
  });
}

// Fire Emergency Form
exports.fireEmergencyFormPage = (req, res) =>{
  res.status(200).render('dashboard/consumers/form-views/fire-emergency-form', {
    title: 'Fire / Emergency Drill Form'
  });
}

//Environmental Checklist Form
exports.environmentalChecklistFormPage = async (req, res, next) =>{
  try {
    res.status(200).render('dashboard/consumers/form-views/environmental-checklist-form', {
      title: 'Environmental Safety Checklist Form',
      datas: EnvChecklistData
    });
  } catch (err) {
    return next(new AppError(err, 404));
  }
}

// Toxic Poison Assessment Form
exports.poisonAssessmentFormPage = (req, res) =>{
  res.status(200).render('dashboard/consumers/form-views/poison-assessment-form', {
    title: 'Toxic Poison Assessment Form'
  });
}

// Legal Assessment Form
exports.legalAssessmentFormPage = (req, res) =>{
  res.status(200).render('dashboard/consumers/form-views/legal-assessment-form', {
    title: 'Annual Assessment of Legal Status Form'
  });
}

//--------------------------------------------------------//
// Respite Service Delivery
exports.respiteServiceDeliveryPage = factory.renderConsumerDeliveryLogsPage(
  RespiteServiceForm, 'Respite Service Delivery Log', 
  'dashboard/consumers/delivery-logs-form-views/respite-service/respite-service-table', 
  'dashboard/consumers/delivery-logs-form-views/respite-service/respite-service-form',
  respiteActivities
  );

// Supported Home Living Service Delivery
exports.supportedHomeLivingPage = factory.renderConsumerDeliveryLogsPage(
  SupportedHomeLivingForm,
  'Supported Home Living / CS / CFC-PAS / Habilitation Log',
  'dashboard/consumers/delivery-logs-form-views/supported-home-living/supported-home-living-table',
  'dashboard/consumers/delivery-logs-form-views/supported-home-living/supported-home-living-form'
);

exports.supportedHomeLivingDetailsPage = factory.renderConsumerFormDetailsPage(
  SupportedHomeLivingForm,
  'Supported Home Living / CS / CFC-PAS / Habilitation Form',
  'dashboard/consumers/delivery-logs-form-views/supported-home-living/supported-home-living-details',
  { path: 'records', select: '-__v -_id'}
  );

// Supported Home Employment
exports.supportedEmploymentPage = factory.renderConsumerDeliveryLogsPage(
  SupportedEmploymentForm,
  'Supported Employment / Employment Assistance Delivery Log',
  'dashboard/consumers/delivery-logs-form-views/supported-employment/supported-employment-table',
  'dashboard/consumers/delivery-logs-form-views/supported-employment/supported-employment-form'
  );

exports.supportedEmploymentDetailsPage = factory.renderConsumerFormDetailsPage(
  SupportedEmploymentForm,
  'Supported Employment / Employment Assistance Delivery Log',
  'dashboard/consumers/delivery-logs-form-views/supported-employment/supported-employment-details'
  );

// RSS - SL Service Delivery Log Form
exports.rssSLServicePage = factory.renderConsumerDeliveryLogsPage(
  RssSLServiceForm,
  'Residential Support Services (RSS) and Supervised Living (SL) Service Delivery Log',
  'dashboard/consumers/delivery-logs-form-views/rss-sl-service/rss-sl-service-table',
  'dashboard/consumers/delivery-logs-form-views/rss-sl-service/rss-sl-service-form',
  rssActivities
);

// Day Habilitation Service Delivery Log Form
exports.dayHabilitationServicePage = factory.renderConsumerDeliveryLogsPage(
  DayHabilitationForm,
  'Day Habilitation Service Delivery Log',
  'dashboard/consumers/delivery-logs-form-views/day-habilitation-service/day-habilitation-service-table',
  'dashboard/consumers/delivery-logs-form-views/day-habilitation-service/day-habilitation-service-form',
  habilitationAreas
);

// PRN Medication List
exports.prnMedicationListPage = factory.renderConsumerDeliveryLogsPage(
  PrnMedicationList,
  'PRN Medication List',
  'dashboard/consumers/extras/prn-medication-list/prn-medication-list-table',
  'dashboard/consumers/extras/prn-medication-list/prn-medication-list-form'
);

// Consent For Release of Medical Information
exports.consentMedicalInfoPage = factory.renderConsumerDeliveryLogsPage(
  ConsentMedicalInfo,
  'Consent For Release of Medical Information',
  'dashboard/consumers/extras/consent-medical-info/consent-medical-info-table',
  'dashboard/consumers/extras/consent-medical-info/consent-medical-info-form'
);


// ------------------------------ NURSING SERVICES FORMS -------------------------------//
// Nursing Services Delivery Log Form
exports.nursingServicesDeliveryPage =  async (req, res, next) =>{
  if(Object.keys(req.query).length === 0 && req.query.constructor === Object){
    return next(new AppError('A query parameter is required to load page.', 400));
  }
  const title = 'Nursing Services Delivery Log - Billable Activities'
  if(req.query.all){
    const forms = await getDocuments(NursingServiceDeliveryForm);
    return res.status(200).render('dashboard/nurses/nursing-service-delivery/nursing-service-delivery-table', {
      title,
      forms
    });
  }
  if(req.query.new){
    return res.status(200).render('dashboard/nurses/nursing-service-delivery/nursing-service-delivery-form', {
      title,
      descriptions: nursingServiceDescriptions
    });
  }
  //Fetch data to porpulate view
}

// Nursing Services Checklist Form
exports.nursingServicesChecklistPage =  async (req, res, next) =>{
  if(Object.keys(req.query).length === 0 && req.query.constructor === Object){
    return next(new AppError('A query parameter is required to load page.', 400));
  }
  const title = 'Nursing Services Checklist';
  const subtitle = 'Waiver Survey and Certification';
  if(req.query.all){
    const forms = await getDocuments(NursingServiceChecklistForm);
    return res.status(200).render('dashboard/nurses/nursing-service-checklist/nursing-service-checklist-table', {
      title,
      subtitle,
      forms
    });
  }
  if(req.query.new){
    return res.status(200).render('dashboard/nurses/nursing-service-checklist/nursing-service-checklist-form', {
      title,
      subtitle,
      descriptions: nursingServiceChecklistData
    });
  }
  //Fetch data to porpulate view
}

// Nursing Services Checklist Form
exports.nursingTasksScreeningPage =  async (req, res, next) =>{
  if(Object.keys(req.query).length === 0 && req.query.constructor === Object){
    return next(new AppError('A query parameter is required to load page.', 400));
  }
  const title = 'Nursing Tasks Screening Tool Form';
  if(req.query.all){
    const forms = await getDocuments(NursingTasksScreeningForm);
    return res.status(200).render('dashboard/nurses/nursing-tasks-screening/nursing-tasks-screening-table', {
      title,
      forms
    });
  }
  if(req.query.new){
    return res.status(200).render('dashboard/nurses/nursing-tasks-screening/nursing-tasks-screening-form', {
      title,
      data: nursingTasksScreeningData
    });
  }
  //Fetch data to porpulate view
}

// Exclusion of Host Home
exports.nursingExclusionOfHostHomePage =  async (req, res, next) =>{
  if(Object.keys(req.query).length === 0 && req.query.constructor === Object){
    return next(new AppError('A query parameter is required to load page.', 400));
  }
  const title = `Exclusion of Host Home/Companion Care (HH/CC) Provider from the
                  Board of Nursing (BON) Definition of Unlicensed Person`;
  if(req.query.all){
    const forms = await getDocuments(ExclusionHostForm);
    return res.status(200).render('dashboard/nurses/exclusion-host-home/exclusion-host-home-table', {
      title,
      forms
    });
  }
  if(req.query.new){
    return res.status(200).render('dashboard/nurses/exclusion-host-home/exclusion-host-home-form', {
      title
    });
  }
  //Fetch data to populate view
}

// RN Delegation Checklist Form
exports.rnDelegationChecklistPage =  async (req, res, next) =>{
  if(Object.keys(req.query).length === 0 && req.query.constructor === Object){
    return next(new AppError('A query parameter is required to load page.', 400));
  }
  const title = `RN Delegation Checklist`;
  const subtitle = `Waiver Survey and Certification | Home and Community-based Services (HCS)/Texas
  Home Living (TxHmL) Program` 
  if(req.query.all){
    const forms = await getDocuments(RNDelegationChecklistForm);
    return res.status(200).render('dashboard/nurses/rn-delegation-checklist/rn-delegation-checklist-table', {
      title,
      forms
    });
  }
  if(req.query.new){
    return res.status(200).render('dashboard/nurses/rn-delegation-checklist/rn-delegation-checklist-form', {
      title,
      subtitle,
      datas: rnDelegationChecklistData
    });
  }
  //Fetch data to populate view
}

// Comprehensive Nursing Assessment Form
exports.comprehensiveNursingAssessmentPage =  async (req, res, next) =>{
  if(Object.keys(req.query).length === 0 && req.query.constructor === Object){
    return next(new AppError('A query parameter is required to load page.', 400));
  }
  const title = `Comprehensive Nursing Assessment Form`;
  const subtitle = `To be performed by a Registered Nurse` 
  if(req.query.all){
    const forms = await getDocuments(ComprehensiveNursingAssessmentForm);
    return res.status(200).render('dashboard/nurses/comprehensive-nursing-assessment/comprehensive-nursing-assessment-table', {
      title,
      forms
    });
  }
  if(req.query.new){
    return res.status(200).render('dashboard/nurses/comprehensive-nursing-assessment/comprehensive-nursing-assessment-form', {
      title,
      subtitle,
      data: comprehensiveNursingAssessmentData
    });
  }
  //Fetch data to populate view
}

// ------------------------------ DIRECTOR SERVICES FORMS -------------------------------//
exports.getExclusionInfoPage = async(req, res) =>{
  res.status(200).render('dashboard/directors/exclusion-information', {
    title: 'Exclusion Information'
  });
}

exports.getDebarInfoPage = async(req, res) =>{
  res.status(200).render('dashboard/directors/debar-information', {
    title: 'Debar Vendor List'
  });
}

exports.exclusionSchedulePage =  async (req, res, next) =>{
  if(Object.keys(req.query).length === 0 && req.query.constructor === Object){
    return next(new AppError('A query parameter is required to load page.', 400));
  }
  const title = 'Exclusion Schedule Checklist'
  if(req.query.all){
    const forms = await getDocuments(ExclusionScheduleForm, {director: req.user._id});
    return res.status(200).render('dashboard/directors/exclusion-schedule/exclusion-schedule-table', {
      title,
      forms
    });
  }
  if(req.query.new){
    return res.status(200).render('dashboard/directors/exclusion-schedule/exclusion-schedule-form', {
      title,
      form: null,
      year: new Date().getFullYear()
    });
  }
  const form = await getOneDocument(ExclusionScheduleForm, {_id: req.query.id});
  const currentMonth = form[0].months[form[0].months.length - 1].month;
  res.status(200).render('dashboard/directors/exclusion-schedule/exclusion-schedule-form', {
    title,
    form: form[0],
    month: generalUtils.getNextEntry(currentMonth, 'month'),
    year: new Date().getFullYear()
  });
}

exports.debarVendorPage =  async (req, res, next) =>{
  if(Object.keys(req.query).length === 0 && req.query.constructor === Object){
    return next(new AppError('A query parameter is required to load page.', 400));
  }
  const title = 'Debar Vendor List Form'
  if(req.query.all){
    const forms = await getDocuments(DebarVendorListForm, {director: req.user._id});
    return res.status(200).render('dashboard/directors/debar-vendor/debar-vendor-table', {
      title,
      forms
    });
  }
  if(req.query.new){
    return res.status(200).render('dashboard/directors/debar-vendor/debar-vendor-form', {
      title,
      form: null,
      year: new Date().getFullYear()
    });
  }
  const form = await getOneDocument(DebarVendorListForm, {_id: req.query.id});
  const currentQuarter = form[0].quarters[form[0].quarters.length - 1].quarter;
  res.status(200).render('dashboard/directors/debar-vendor/debar-vendor-form', {
    title,
    form: form[0],
    quarter: generalUtils.getNextEntry(currentQuarter, 'quarter'),
    year: new Date().getFullYear()
  });
}

exports.criticalIncidentPage =  async (req, res, next) =>{
  if(Object.keys(req.query).length === 0 && req.query.constructor === Object){
    return next(new AppError('A query parameter is required to load page.', 400));
  }
  const title = 'Critical Incident Report Form'
  if(req.query.all){
    const forms = await getDocuments(CriticalIncidentReportForm, {director: req.user._id});
    return res.status(200).render('dashboard/directors/critical-incident/critical-incident-table', {
      title,
      forms
    });
  }
  if(req.query.new){
    return res.status(200).render('dashboard/directors/critical-incident/critical-incident-form', {
      title,
      form: null,
      year: new Date().getFullYear()
    });
  }
  const form = await getOneDocument(CriticalIncidentReportForm, {_id: req.query.id});
  const currentMonth = form[0].months[form[0].months.length - 1].month;
  res.status(200).render('dashboard/directors/critical-incident/critical-incident-form', {
    title,
    form: form[0],
    month: generalUtils.getNextEntry(currentMonth, 'month'),
    year: new Date().getFullYear()
  });
}

exports.consumerSatisfactionPage =  async (req, res, next) =>{
  if(Object.keys(req.query).length === 0 && req.query.constructor === Object){
    return next(new AppError('A query parameter is required to load page.', 400));
  }
  const title = 'Consumer Satisfaction Quarterly Review'
  if(req.query.all){
    const forms = await getDocuments(ConsumerSatisfactionReviewForm, {agency: req.user.agency});
    return res.status(200).render('dashboard/directors/consumer-satisfaction/consumer-satisfaction-table', {
      title,
      forms
    });
  }
  if(req.query.new){
    return res.status(200).render('dashboard/directors/consumer-satisfaction/consumer-satisfaction-form', {
      title,
      data: consumerSatisfactionData
    });
  }
}

exports.noticeForAdvisoryCommitteePage =  async (req, res, next) =>{
  if(Object.keys(req.query).length === 0 && req.query.constructor === Object){
    return next(new AppError('A query parameter is required to load page.', 400));
  }
  const title = 'Notice For Advisory Committee Meeting'
  if(req.query.all){
    const forms = await getDocuments(NoticeForAdvisoryCommitteeForm, {director: req.user._id});
    return res.status(200).render('dashboard/directors/notice-for-advisory-committee/notice-for-advisory-committee-table', {
      title,
      forms
    });
  }
  if(req.query.new){
    return res.status(200).render('dashboard/directors/notice-for-advisory-committee/notice-for-advisory-committee-form', {
      title,
      director: `${req.user.firstName} ${req.user.lastName}`
    });
  }
}

exports.dentalSummarySheetPage =  async (req, res, next) =>{
  if(Object.keys(req.query).length === 0 && req.query.constructor === Object){
    return next(new AppError('A query parameter is required to load page.', 400));
  }
  const title = 'Dental Summary Sheet'
  if(req.query.all){
    const forms = await getDocuments(DentalSummarySheetForm, {director: req.user._id});
    return res.status(200).render('dashboard/directors/dental-summary-sheet/dental-summary-sheet-table', {
      title,
      forms
    });
  }
  if(req.query.new){
    return res.status(200).render('dashboard/directors/dental-summary-sheet/dental-summary-sheet-form', {
      title,
      years: generalUtils.generateYears(20),
      months: generalUtils.generateMonths()
    });
  }
}


exports.minorHomeAdaptiveAidsSummaryPage =  async (req, res, next) =>{
  if(Object.keys(req.query).length === 0 && req.query.constructor === Object){
    return next(new AppError('A query parameter is required to load page.', 400));
  }
  const title = 'Minor Home Modification/Adaptive Aids Summary Sheet'
  if(req.query.all){
    const forms = await getDocuments(MinorHomeAdaptiveAidsSummaryPage, {director: req.user._id});
    return res.status(200).render('dashboard/directors/minor-adaptive-summary-sheet/minor-adaptive-summary-sheet-table.ejs', {
      title,
      forms
    });
  }
  if(req.query.new){
    return res.status(200).render('dashboard/directors/minor-adaptive-summary-sheet/minor-adaptive-summary-sheet-form.ejs', {
      title,
      years: generalUtils.generateYears(20),
      months: generalUtils.generateMonths()
    });
  }
}

//////////////  STATICS PAGES ///////////////////////////////////////

//Static Pages For Nurses and PD information
exports.getNursingServicesPage = async(req, res) =>{
  res.status(200).render('dashboard/nurses/nurse-services', {
    title: 'Nursing Services'
  });
}

//Static Pages For Nurses and PD information
exports.getDirectorServicesPage = async(req, res) =>{
  res.status(200).render('dashboard/directors/director-services', {
    title: 'Program Director Services'
  });
}

exports.getMinutesSamplePage = async(req, res) =>{
  res.status(200).render('dashboard/directors/minutes-sample', {
    title: 'Sample of Minutes of Advisory Committee Meeting'
  });
}