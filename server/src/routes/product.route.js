const express = require("express");
const { getProduct, getProductDetail, createProduct, GetProductTop } = require("../controllers/product.cts");
const isAdmin = require("../middleware/isAdmin");
const protectedRoute = require("../middleware/protectedRoute");
const idMatch = require("../middleware/idMatch");
const router = express.Router();

router.get("/list", getProduct);
router.get("/detail/:id", idMatch, getProductDetail); //Product._id
router.get("/top", GetProductTop);
router.post("/create", protectedRoute, isAdmin, createProduct);
router.post("/update/:id", idMatch, protectedRoute, isAdmin); //Product._id
router.delete("/delete/:id", idMatch, protectedRoute, isAdmin); //Product._id

router.get("/:id/review/list", idMatch); //Product._id 
router.post("/:id/review/create", idMatch, protectedRoute, isAdmin); //Product._id - Product.review._id
router.post("/:id/review/update/:id2", idMatch, protectedRoute, isAdmin); //Product._id - Product.review._id
router.delete("/:id/review/delete/:id2", idMatch, protectedRoute, isAdmin); //Product._id - Product.review._id

module.exports = router;
