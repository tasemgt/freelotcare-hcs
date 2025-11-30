const AppError = require('../utils/app-error');


exports.getDocuments = async (Model, query) =>{
  try {
    const documents = query? await Model.find(query) : await Model.find({});
    return documents;
  } 
  catch (err) {
    return new AppError(err, 404);
  }
}

exports.getOneDocument = async (Model, query) =>{
  try {
    const document = query? await Model.find(query) : null;
    return document;
  } 
  catch (err) {
    return new AppError(err, 404);
  }
}

exports.createOne = (Model) => async (req, res) =>{
  try{
    console.log((req.body));
    const document = await Model.create(req.body);
    res
    .status(201)
    .json({
      status: 'success',
      data: document
    });
  }
  catch(err){
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.updateOne = Model => async (req, res, next) =>{
  try{
    const document = await Model.findByIdAndUpdate(req.params.id || req.query.id, req.body, {
      new: true, //To return the updated document
    });

    if(!document){
      return next(new AppError('No resource found with that ID', 404));
    }

    res
    .status(200)
    .json({
      status: 'success',
      data: document
    });
  }
  catch(err){
    res.status(404).json({
      status: 'fail',
      message: err
    });
  } 
};

exports.renderConsumerDeliveryLogsPage = (Model, title, tablePage, formPage, extras) =>  async (req, res, next) =>{
  if(Object.keys(req.query).length === 0 && req.query.constructor === Object){
    return next(new AppError('A query parameter is required to load page.', 400));
  }
  if(req.query.all){
    const logs = await this.getDocuments(Model, {agency: req.user.agency});
    console.log("LOGS> ",logs);
    res.status(200).render(tablePage, {
      title,
      logs,
      forms: logs
    });
  }
  else if(req.query.new){
    res.status(200).render(formPage, {
      title,
      sections: extras,
      form: null,
      week: 1
    });
  }
  //Fetch data to porpulate view
  else{
    //An Update on form
    const form = await Model.findById(req.query.id);
    res.status(200).render(formPage, {
      title,
      form
    });
  }
}

exports.renderConsumerFormDetailsPage = (Model, title, page, options) => async (req, res) =>{
  const form = await Model.findById(req.params.id).populate(options);
  if(form){
    res.status(200).render(page, {
      title,
      form
    });
  }
}
