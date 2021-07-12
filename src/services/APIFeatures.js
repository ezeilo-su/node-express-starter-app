class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    const queryObj = { ...this.queryStr };
    const excludedFields = ['page', 'sort', 'limit', 'fileds'];
    excludedFields.forEach(el => delete queryObj[el]);
    let queryStr = JSON.stringify(this.queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryObj));

    return this;    // Return this object in order allow methods chaining on the instance
  }

  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAT');
    }

    return this;    // Return this object in order allow methods chaining on the instance
  }

  limitFields() {
    if(this.queryStr.fields) {
      const fields = this.queryStr.fields.split(',').join(' ');
      this.query = this.queryStr.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;    // Return this object in order allow methods chaining on the instance
  }

  paginate() {
    const page = this.queryStr.page + 1 || 1;   // convert to string by multiplying by 1, set to 1 if not present.
    const limit = this.queryStr.limit + 1 || 100;   // convert to string by multiplying by 1, set to 100 if not present.
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;    // Return this object in order allow methods chaining on the instance
  }
}