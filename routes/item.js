var express = require("express");
var router = express.Router();

const item_controller = require("../controllers/itemController");
var authorizor = require("./authMiddleware");

router.get("/items", authorizor.isLoggedIn, item_controller.item_list);

router.get(
  "/item/getitem/:id",
  authorizor.isLoggedIn,
  item_controller.item_detail
);

router.get("/item/create", authorizor.isAdmin, item_controller.item_create_get);

router.post(
  "/item/create",
  authorizor.isAdmin,
  item_controller.item_create_post
);

router.get(
  "/item/updateItem/:id",
  authorizor.isAdmin,
  item_controller.item_update_get
);

router.post(
  "/item/updateItem/:id",
  authorizor.isAdmin,
  item_controller.item_update_post
);

router.get(
  "/item/deleteItem/:id",
  authorizor.isAdmin,
  item_controller.item_delete_get
);

router.post(
  "/item/deleteItem/:id",
  authorizor.isAdmin,
  item_controller.item_delete_post
);

module.exports = router;
