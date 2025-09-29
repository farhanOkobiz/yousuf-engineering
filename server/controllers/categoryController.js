const Category = require("../models/categoryModel");
const Product = require("../models/productModel");
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

// exports.createCategoryController = createOne(Category);
exports.createCategoryController = catchAsync(async (req, res, next) => {
  const { title, brand } = req.body;

  if (!title || !brand) {
    return next(new AppError("Category title and brand are required", 400));
  }

  // Check if a category with the same title exists for the given brand
  const existingCategory = await Category.findOne({
    title,
    brand,
  });

  console.log(existingCategory, "existing category ==================>");
  console.log("category controller___________________")

  if (existingCategory) {
    res.status(400).json({
      status: "failed",
      error: {
        message: "A category with the same title and brand already exists",
      },
    });
  } else {
    // Generate slug and create the category
    const slug = generateSlug(title);
    const newCategory = await Category.create({
      ...req.body,
      slug,
    });

    res.status(201).json({
      status: "success",
      data: {
        category: newCategory,
      },
    });
  }
});

// exports.getAllCategoriesController = getAll(Category);
exports.getAllCategoriesController = catchAsync(async (req, res) => {
  const categories = await Category.find().populate("brand");

  const categoriesWithProductCount = await Promise.all(
    categories.map(async (category) => {
      const productCount = await Product.countDocuments({
        category: category._id,
      });
      return {
        ...category.toObject(),
        totalProducts: productCount,
      };
    })
  );

  res.status(200).json({
    status: "success",
    results: categoriesWithProductCount.length,
    data: {
      categories: categoriesWithProductCount,
    },
  });
});

exports.getCategoryController = getOneBySlug(Category);

exports.updateCategoryController = updateOneBySlug(Category);

exports.deleteCategoryController = catchAsync(async (req, res, next) => {
  const { slug } = req.params;

  // 1. Find the category by slug
  const category = await Category.findOne({ slug });
  if (!category) {
    return next(new AppError("No category was found with that name!", 404));
  }

  await Category.findByIdAndDelete(category._id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

// All Products of a Category:
exports.getAllProductsOfCategory = catchAsync(async (req, res, next) => {
  const { slug } = req.params;

  const category = await Category.findOne({ slug });
  if (!category) {
    return next(new AppError("No category was found with that name!", 404));
  }
  console.log(category, "category ============");

  const query = Product.find({ category: category._id });
  // const query = Product.find({ _id: { $in: category.products } });
  const count = await Product.countDocuments({
    category: category._id,
  });
  // const count = await Product.countDocuments({
  //   _id: { $in: category.products },
  // });

  const features = new APIFeatures(query, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const products = await features.query;
  console.log(products, "products__________");

  res.status(200).json({
    status: "success",
    totalData: count,
    results: products.length,
    data: {
      products,
    },
  });
});
