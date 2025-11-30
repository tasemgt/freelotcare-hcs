const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/app-error');
const User = require('../models/user/user');


const checkToken = (req) =>{
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token =  req.headers.authorization.split(' ')[1];
  }
  else if(req.cookies.jwt){
    token = req.cookies.jwt;
  }

  if(!token){
    return null;
  }

  return token;

}


exports.authenticate = async (req, res, next) =>{
  let token;
  try {
    
    token = checkToken(req);
    if(!token){
      return next(new AppError('You are not logged in!!', 401));
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if(!currentUser) return next(new AppError('The user with this token no longer exists', 401));

    //Check if user changed password after token was created
    if(currentUser.changedPasswordAfter(decoded.iat)){
      return next(new AppError('User recently changed password! Please log in again.', 401));
    }

    //Proceed and grant access to protected route
    req.user = currentUser;
    req.token = token;

    //Persist user in locals
    res.locals.user = currentUser;
    // console.log(res.locals.user);
    next();
    
  } catch (err) {
    if(err.name === 'JsonWebTokenError'){
      next(new AppError('Invalid token. Please log in again', 401));
    }
    if(err.name === 'TokenExpiredError'){
      next(new AppError('Your token has expired, please log in again', 401));
    }
  }
}

exports.authorize = (...roles) =>{
    return (req, res, next) =>{
      if(!roles.includes(req.user.role)){
        return next(new AppError('You do not have permission to perform this action', 403));
      }
      next();
    }
}

// // Only for rendered pages, no errors
exports.isLoggedIn = async (req, res, next) =>{
  console.log('Called')
  const token = checkToken(req);
  if(token){
    return res.status(200).redirect('/dashboard');
  }
  return next();
}