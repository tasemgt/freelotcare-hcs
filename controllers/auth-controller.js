const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/user/user');
const AppError = require('../utils/app-error');
const sendEmail = require('../utils/email');

const signToken = id =>{
  return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
}

const createSendToken = (user, statusCode, res) =>{
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 *1000),
    httpOnly: true,
  }

  //Add the secure option for production environment
  if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  // Remove the password form the output
  user.password = undefined;

  res
  .status(statusCode)
  .cookie('jwt', token, cookieOptions)
  .json({
    status: 'success',
    token,
    data: { user }
  });
}


exports.login = async(req, res, next) =>{
  try {
    const { email, password} = req.body;

    if(!email || !password){
      return next(new AppError('Please provide email and password', 400));
    }

    const user = await User.findOne({email}).select('+password');

    if(!user || !(await user.comparePassword(password, user.password))){
      return next(new AppError('Incorrect email or password', 401));
    }

    createSendToken(user, 200, res);

  } 
  catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
}

exports.logout = (req, res) =>{
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000), //10secs
    httpOnly: true
  });

  res.status(200).json({status: 'success'});
};


exports.updatePassword = async (req, res, next) =>{

  console.log(req.body);
  try {
    const { currentPassword } = req.body;

    //Get user and fetch current password
    const user = await User.findById(req.user.id).select('+password');

    //Confirm correctness of password
    if(!user || !(await user.comparePassword(currentPassword, user.password))){
      return next(new AppError('Password Provided is wrong.', 401));
    }

    //Update password
    user.password = req.body.newPassword;
    user.passwordConfirm = req.body.confirmPassword;

    await user.save();

    // //Send email
    // const to = user.email;
    // const msg = {
    //   subject: `Password Updated!`,
    //   text:  `Hello ${user.firstName}! \nYour new updated password is '${req.body.newPassword}'.\nRegards.`
    // }
    // emailService.sendEmail(to, msg);

    //Send email
    sendEmail({
      email: user.email,
      subject: 'Password Updated!',
      message: `Hello ${user.firstName}! \n\nYour new updated password is '${req.body.newPassword}'.\n\nBest Regards,\nFree Lot Care Team`
    });

    //Login user
    createSendToken(user, 200, res);
  } 
  catch (err) {
    res.status(500).json({
      status: 'failed',
      err
    });
  }

}