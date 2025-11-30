class APIFeatures{

  constructor(documentQuery, queryString){
    this.documentQuery = documentQuery;
    this.queryString = queryString;
  }

  buildFilterQuery(){
    const query = {...this.queryString};
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
 
    excludedFields.forEach(el => delete query[el]);
 
    let queryStr = JSON.stringify(query);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
 
    this.documentQuery = this.documentQuery.find(JSON.parse(queryStr)); 

    return this;
  }

  buildSortQuery(){
    if(this.queryString.sort){
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.documentQuery = this.documentQuery.sort(sortBy);
    } else{
      this.documentQuery = this.documentQuery.sort('-createdAt');
    }

    return this;
  }

  buildLimitQuery(){
    if(this.queryString.fields){
      const fields = this.queryString.fields.split(',').join(' ');
      this.documentQuery = this.documentQuery.select(fields);
    }else{
      this.documentQuery = this.documentQuery.select('-__v');
    }

    return this;
  }

  buildPaginationQuery(){
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.documentQuery = this.documentQuery.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;