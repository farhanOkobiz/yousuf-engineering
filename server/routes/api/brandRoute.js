const express = require("express");
const protectMiddleware = require("../../middlewares/protectMiddleware");
const restrictToMiddleware = require("../../middlewares/restrictToMiddleware");
const {
  getAllBrandsController,
  getBrandController,
  getAllProductsOfBrand,
  createBrandController,
  updateBrandController,
  deleteBrandController,
  getAllCategoriesOfBrand,
} = require("../../controllers/brandController");

const router = express.Router();

router.get("/", getAllBrandsController);
router.get("/:slug", getBrandController);
router.get("/:slug/categories", getAllCategoriesOfBrand);
router.get("/:slug/products", getAllProductsOfBrand);

router.use(protectMiddleware);
router.use(restrictToMiddleware("admin"));

router.post("/", createBrandController);

router
  .route("/:slug")
  .patch(updateBrandController)
  .delete(deleteBrandController);

module.exports = router;
