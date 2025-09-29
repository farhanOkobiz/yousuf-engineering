const Brand = require("../models/brandModel");
const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const AppError = require("../utils/AppError");
const APIFeatures = require("../utils/APIFeatures");
const catchAsync = require("../utils/catchAsync");
// const { deleteUploadedImages } = require("../middlewares/photoMiddleware");
const {
  // createOne,
  // getAll,
  getOneBySlug,
  updateOneBySlug,
} = require("./handleFactory");
const generateSlug = require("../utils/slugGenerator");

// exports.createBrandController = createOne(Brand);
exports.createBrandController = catchAsync(async (req, res) => {
  const body = {
    ...req.body,
  };
  console.log(req.body, "from brand controller =====================>");
  const title = body?.title;
  const slug = generateSlug(title);
  body.slug = slug;

  const doc = await Brand.create(body);

  res.status(201).json({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      doc,
    },
  });
});

// exports.getAllBrandsController = getAll(Brand);
exports.getAllBrandsController = catchAsync(async (req, res) => {
  const brands = await Brand.aggregate([
    {
      $lookup: {
        from: "products", // Collection name in MongoDB
        localField: "_id",
        foreignField: "brand",
        as: "products",
      },
    },
    {
      $addFields: {
        totalProducts: { $size: "$products" },
      },
    },
    {
      $project: {
        products: 0, // Exclude products array to reduce response size
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    results: brands.length,
    data: {
      brands,
    },
  });
});

exports.getBrandController = getOneBySlug(Brand);

exports.updateBrandController = updateOneBySlug(Brand);

exports.deleteBrandController = catchAsync(async (req, res, next) => {
  const { slug } = req.params;

  // 1. Find the brand by slug
  const brand = await Brand.findOne({ slug });
  if (!brand) {
    return next(new AppError("No brand was found with that name!", 404));
  }

  await Brand.findByIdAndDelete(brand._id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

// All Categories of a Brand:
exports.getAllCategoriesOfBrand = catchAsync(async (req, res, next) => {
  const { slug } = req.params;

  const brand = await Brand.findOne({ slug });
  if (!brand) {
    return next(new AppError("No brand was found with that name!", 404));
  }

  const query = Category.find({ brand: brand._id });
  const count = await Category.countDocuments({ brand: brand._id });

  const features = new APIFeatures(query, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const categories = await features.query;

  res.status(200).json({
    status: "success",
    totalData: count,
    results: categories.length,
    data: {
      categories,
    },
  });
});

// All Products of a Brand:
exports.getAllProductsOfBrand = catchAsync(async (req, res, next) => {
  const { slug } = req.params;

  const brand = await Brand.findOne({ slug });
  if (!brand) {
    return next(new AppError("No brand was found with that name!", 404));
  }

  const query = Product.find({ brand: brand._id });
  const count = await Product.countDocuments({ brand: brand._id });

  const features = new APIFeatures(query, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const products = await features.query;

  res.status(200).json({
    status: "success",
    totalData: count,
    results: products.length,
    data: {
      products,
    },
  });
});
