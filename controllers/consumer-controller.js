const {promisify} = require('util');
const uuid = require('uuid').v4;
const Consumer = require('../models/consumer');
const AppError = require('../utils/app-error');
const fileUpload = require('../utils/file_upload');

const {createS3Params} = fileUpload;
 
exports.setDocumentIDs = (req, res, next) =>{
  const lcNum = req.body.lcNumber;
  const directorID = req.user._id;

  req.files.directedPlan[0].key = `consumerdocs/${directorID}/${lcNum}/directedPlan.pdf`;
  req.files.ipc[0].key = `consumerdocs/${directorID}/${lcNum}/ipc.pdf`;
  req.files.transferPaper[0].key = `consumerdocs/${directorID}/${lcNum}/transferPaper.pdf`;
  req.files.icap[0].key = `consumerdocs/${directorID}/${lcNum}/icap.pdf`;
  req.files.idrc[0].key = `consumerdocs/${directorID}/${lcNum}/idrc.pdf`;
  req.files.consumerRights[0].key = `consumerdocs/${directorID}/${lcNum}/consumerRights.pdf`;

  next();
}

exports.awsS3Upload = async (req, res, next) =>{
  const s3 = fileUpload.aws();
  const files = {...req.files};

  const directedPlan = createS3Params(files.directedPlan[0]);
  const ipc = createS3Params(files.ipc[0]);
  const icap = createS3Params(files.icap[0]);
  const idrc = createS3Params(files.idrc[0]);
  const transferPaper = createS3Params(files.transferPaper[0]);
  const consumerRights = createS3Params(files.consumerRights[0]);

  try{
      const response = await Promise.all([
        s3.upload(directedPlan).promise(),
        s3.upload(ipc).promise(),
        s3.upload(icap).promise(),
        s3.upload(idrc).promise(),
        s3.upload(transferPaper).promise(),
        s3.upload(consumerRights).promise()
      ]);
      
      //Set the keys in the body
      req.body.directedPlan = response[0].Key; req.body.ipc = response[1].Key;
      req.body.icap = response[2].Key; req.body.idrc = response[3].Key;
      req.body.transferPaper = response[4].Key; req.body.consumerRights = response[5].Key;
      next();
  }
  catch(err){
    return new AppError(`Failed to upload your documents to server`, 500);
  }
}

exports.registerConsumer = async(req, res, next) =>{
  
  const payload = { 
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    lcNumber: req.body.lcNumber,
    phone: req.body.phone,
    dob: req.body.dob,
    address: req.body.address,
    behaviorPlan: req.body.behaviorPlan,
    consumerServices: JSON.parse(req.body.consumerServices), //Parse to js object after converting from formData
    directedPlan: { filename: req.body.directedPlan, expiry: req.body.exp_directedPlan },
    ipc: { filename: req.body.ipc, expiry: req.body.exp_ipc },
    transferPaper: { filename: req.body.transferPaper, expiry: req.body.exp_transferPaper },
    icap: { filename: req.body.icap, expiry: req.body.exp_icap },
    idrc: { filename: req.body.idrc, expiry: req.body.exp_idrc },
    consumerRights: { filename: req.body.consumerRights, expiry: req.body.exp_consumerRights },
    agency: req.user.agency._id
  }

  console.log(payload);
  try {
    const consumer = await Consumer.create(payload);

    res.status(201).json({
      status: 'success',
      data: {
        consumer
      }
    });

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
}