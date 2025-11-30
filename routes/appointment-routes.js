const express = require('express');
const appointmentController = require('../controllers/appointment-controller');
const auth = require('../middlewares/auth-middlewares');


const router = express.Router();

router.post('/', auth.authenticate, appointmentController.bookAppointment);

module.exports = router;