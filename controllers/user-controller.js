const generatePassword  = require('password-generator');

const User = require('../models/user/user');
const Staff = require('../models/user/staff');
const Director = require('../models/user/director');
const AppError = require('../utils/app-error');

// const sms = require('../utils/sms');
const sendEmail = require('../utils/email');


exports.createUser = async(req, res) =>{
  const password = generatePassword(12, false);

  const Model = req.body.role === 'director'? Director : Staff;

  req.body.password = password;

  try {
    const user = await Model.create(req.body);
    
    //Send email
    // const to = req.body.email;
    // const msg = {
    //   subject: `Congratulations!`,
    //   text:  `Hello ${user.firstName},\nYour user account has just been created.
    //   \nYour Login is:\nEmail --> ${user.email}\nPassword --> ${password}
    //   \nRegards.`
    // }
    // emailService.sendEmail(to, msg);

    sendEmail({
      email: req.body.email,
      subject: 'Congratulations!',
      message: `Hello ${user.firstName},\n\nYour user account has just been created.
      \nYour Login is:\nEmail --> ${user.email}\nPassword --> ${password}
      \n\nBest Regards,\nFree Lot Care Team`
    });

    // console.log('User password>>>>> ', password);

    res.status(201).json({
      status: 'success',
      data: {
        user,
        password
      }
    });

  } catch (err) {
    let error;
    if(err.code) { //Mongo Error!
      error = err;
    }
    else{
      error = 'An error occurred while submitting your application, please try again later';
    }
    res.status(500).json({
      status: 'fail',
      message: error
    });
  }
};



exports.getUsers = async(req, res) =>{
  try {
    const users = await User.find();

    res
    .status(200)
    .json({
      status: 'success',
      results: users.length,
      data: { users }
    });
  } 
  catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
}

exports.getMe = (req, res, next) =>{
  if(!req.user) return next(new AppError('You must be logged in to get your details', 401));
  req.params.id = req.user.id // Gotten from my token
  next();
};

exports.getUser = async (req, res, next) =>{
  try{
    const {id} = req.params;
    const user = await User.findById(id);

    if(!user){
      return next(new AppError('No user found with that ID', 404));
    }

    res
    .status(200)
    .json({
      status: 'success',
      data: { user }
    });
  }
  catch(err){
    res.status(404).json({
      status: 'failure',
      message: err,
    });
  }
};