const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const userRouter = require('./routes/user-routes');
const consumerRouter = require('./routes/consumer-routes');
const consumerFormsRouter = require('./routes/consumer-forms-routes');
const nurseFormsRouter = require('./routes/nurse-forms-routes');
const directorFormsRouter = require('./routes/director-forms-routes');
const appointmentRouter = require('./routes/appointment-routes');
const viewRouter = require('./routes/view-routes');

const AppError = require('./utils/app-error');


const globalErrorHandler = require('./middlewares/error-middleware');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Global Middlewares

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/axios')));

//Set security http headers
// app.use(helmet({
//   contentSecurityPolicy: false
// }));

// Development Logging
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message:  'Too many requests from this IP, please try again in an hour!'
});
app.use('/api',limiter); //Apply limiter to all api routes

// Body parser, reading data from body into req.body
app.use(express.json({limit: '500kb'}));
app.use(express.urlencoded({extended:true, limit: '500kb'}));

//Parses the cookies from the request
app.use(cookieParser());

// Data sanitization against NOSQL query injection
// e.g "email": { "$gt": ""}
app.use(mongoSanitize()); //remove dolar like signs

// Data sanitiaztion against XSS
app.use(xss()); //clean from malicious html and js code

// Prevents parameter polution (like using sort twice)
// app.use(hpp({
//   whitelist: []
// }));

//Compresses all text responses sent to client
app.use(compression());

//Test middleware
// app.use((req, res, next) =>{
//    req.requestTime = new Date().toISOString();
//    console.log(req.cookies);
//    next();
// });


//Routes
app.use('/', viewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/consumers', consumerRouter);
app.use('/api/v1/consumer-forms', consumerFormsRouter);
app.use('/api/v1/nurse-forms', nurseFormsRouter);
app.use('/api/v1/director-forms', directorFormsRouter);
app.use('/api/v1/appointments', appointmentRouter);

app.all('*', (req, res, next) =>{
  next(new AppError(`Can't find '${req.originalUrl}' on this server!`, 404));
});

//Error Handling middleware
app.use(globalErrorHandler);

module.exports = app;

