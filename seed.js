const fs = require('fs');
const dotenv = require('dotenv').config({path: './config.env'});
const mongoose = require('mongoose');

const User = require('./models/user/user');
const Staff = require('./models/user/staff');

//Consumer Forms Data
const EnvChecklistData = require('./models/data/environmental-checklist-data');

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(conn => console.log('DB connection successful!'));

// Read the files
const users = JSON.parse(fs.readFileSync(`${__dirname}/data/users.json`, 'utf-8'));
const staff = JSON.parse(fs.readFileSync(`${__dirname}/data/staff.json`, 'utf-8'));
const envChecklistData = JSON.parse(fs.readFileSync(`${__dirname}/data/environmental-checklist.json`, 'utf-8'));

const seedDB = async () =>{
  try{
    await User.create(users, { validateBeforeSave: false });
    await Staff.create(staff, { validateBeforeSave: false });

    console.log('Data successfully loaded');
    process.exit();
  }
  catch(err){
    console.log(err);
  }
}

const clearDB = async () =>{
  try{
    await User.deleteMany();
    await Staff.deleteMany();

    console.log('Data successfully deleted!');
    process.exit();
  }
  catch(err){
    console.log(err);
  }
}

const seedFormsData = async () =>{
  try{
    await EnvChecklistData.deleteMany();
    console.log('Data successfully deleted!');

    await EnvChecklistData.create(envChecklistData);
    console.log('Data successfully loaded');
    process.exit();
  }
  catch(err){
    console.log(err);
  }
}

switch(process.argv[2]){
  case '--seed':
    seedDB();
    break;
  case '--clear':
    clearDB();
    break;
  case '--forms':
    seedFormsData();
    break;
  default:
    console.log('Done');
}