const AppError = require('../utils/app-error');

const handleCastErrorDB = err =>{
  const message = `Invalid ${err.path}: ${err.value}.`
  return new AppError(message, 404);
};



const sendErrorDev = (err, req, res) =>{
  
  //API
  if(req.originalUrl.startsWith('/api')){
    res
    .status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message
    });
  }
  
  //RENDER
  else{
    const statusCode = err.statusCode.toString();

    if(statusCode.startsWith('4') && err.statusCode !== 404){
      switch(statusCode){
        case '401':
          return res.status(401).redirect('/login');
        case '403':
          return res.redirect('/dashboard/error?type=not-authorized');
        default:
          return res.status(500).json({message:"An Error occured..."});
      }
    }


    //EMPLOYMENT & AGENCY APPLICATION (SEPERATE RESOURCE)
    if((req.originalUrl.startsWith('/employment') || req.originalUrl.startsWith('/agency'))  && err.statusCode === 404){
      return res
      .status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message
      });
    }

    if(err.statusCode === 500){
      return res.redirect('/dashboard/error?type=server-error');
    }

    console.log("ERROR> ",err)
    //FINALLY RENDER 404 PAGE
    res.redirect('/dashboard/error?type=not-found');

    // res.status(err.statusCode).render('error', {
    //   title: 'Error!',
    //   msg: err.message
    // });
  }
  
}

const sendErrorProd = (err, req, res) =>{
  // Operational, trusted error: send message to client
  if(err.isOperational){
    res
    .status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }
  // Programming or other unknown error: don't leak error details
  else{
    // 1. Log error
    console.error('ERROR 🎇', err);

    // 2. Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    });
  }
  
}



module.exports = (err, req, res, next) =>{
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  console.log(err);
  sendErrorDev(err, req, res);

  // if(process.env.NODE_ENV === 'development'){
  //   console.log('In development.....')
  //   sendErrorDev(err, req, res);
  // } 
  // else if(process.env.NODE_ENV === 'production'){

  //   let error = {...err};
    
  //   if(error.name === 'CastError'){
  //     error = handleCastErrorDB(error);
  //   }
  //   else{
  //     sendErrorDev(error, req, res);
  //   }
  // }
  
};