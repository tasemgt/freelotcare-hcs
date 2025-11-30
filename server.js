const dotenv = require('dotenv').config({path: './config.env'});
const mongoose = require('mongoose');
const app = require('./app');

//Database connection
//const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(conn => console.log('DB connection successful!'))
  .catch(err => console.log('Cannot connect to the database', err));


// console.log(process.env); 
const port = process.env.PORT || 3001;

app.listen(port, () =>{
  console.log(`App running on port ${port}...`);
});
