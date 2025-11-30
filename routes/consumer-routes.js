const express = require('express');
const authenticator = require('../middlewares/auth-middlewares');
const consumerController = require('../controllers/consumer-controller');
const fileUpload = require('../utils/file_upload');

const router = express.Router();

const docs = [
  {name: 'directedPlan', maxCount: 1},
  {name: 'ipc', maxCount: 1},
  {name: 'transferPaper', maxCount: 1},
  {name: 'icap', maxCount: 1},
  {name: 'idrc', maxCount: 1},
  {name: 'consumerRights', maxCount: 1}
]

router.post('/', 
  authenticator.authenticate,  // Authenticates user
  authenticator.authorize('director'), //Authorizes only a director to create consumers
  fileUpload.multerPdf(docs), // Users multer to fetch the data from form
  consumerController.setDocumentIDs, //Sets IDs for all files
  consumerController.awsS3Upload, //Uploads the files to s3
  consumerController.registerConsumer); // Proceeds with handler function for rest of form data


module.exports = router;