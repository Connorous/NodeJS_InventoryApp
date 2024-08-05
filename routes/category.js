var express = require("express");
var router = express.Router();

const category_controller = require("../controllers/categorycontroller");
var authorizor = require("./authMiddleware");

router.get(
  "/categories",
  authorizor.isLoggedIn,
  category_controller.category_list
);

router.get(
  "/category/getcategory/:id",
  authorizor.isLoggedIn,
  category_controller.category_detail
);

router.get(
  "/category/create",
  authorizor.isAdmin,
  category_controller.category_create_get
);

router.post(
  "/category/create",
  authorizor.isAdmin,
  category_controller.category_create_post
);

router.get(
  "/category/updateCategory/:id",
  authorizor.isAdmin,
  category_controller.category_update_get
);

router.post(
  "/category/updateCategory/:id",
  authorizor.isAdmin,
  category_controller.category_update_post
);

router.get(
  "/category/deleteCategory/:id",
  authorizor.isAdmin,
  category_controller.category_delete_get
);

router.post(
  "/category/deleteCategory/:id",
  authorizor.isAdmin,
  category_controller.category_delete_post
);

module.exports = router;
