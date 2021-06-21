const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const deleteOne = Model => catchAsync(async (req, res, next) => {
  const doc = await Model.findByIdAndDelete(req.params.id);

  if(!doc) {
    return next(new AppError('No record found with this ID'));
  }

  return res.status(204).json({
    status: 'success',
    data: null
  })
});

const updateOne = Model => catchAsync(async (req, res, next) => {
  const doc = await Model.findByIdAndUpdat(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if(!doc) {
    return next(new AppError('No record found with this ID'));
  }

  return res.status(204).json({
    status: 'success',
    data: {
      data: doc
    }
  })
});

const createOne = Model => catchAsync(async (req, res, next) => {
  const doc = await Model.create(req.body);

  return res.status(201).json({
    status: 'success',
    data: {
      data: doc
    }
  })
});

const getOne = (Model, popOptions) => catchAsync(async (req, res, next) => {
  let query = Model.findBuId(req.params.id);
  if (popOptions) query = query.populate(popOptions);

  const doc = await query;

  if(!doc) {
    return next(new AppError('No record found with this ID'));
  }

  return res.status(201).json({
    status: 'success',
    data: {
      data: doc
    }
  })
});

const getAll = (Model) => catchAsync(async (req, res, next) => {
  const features = new APIFeature(Model.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()

    const doc = await features;

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc
      }
    })
});

module.exports = {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
};