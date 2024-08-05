var express = require("express");
var router = express.Router();

const user_controller = require("../controllers/usercontroller");

var authorizor = require("./authMiddleware");

/* GET home page. */
router.get("/", authorizor.isLoggedIn, function (req, res, next) {
  res.render("index", {
    title: "Item Shop Inventory Management System",
    user: req.user,
  });
});

router.get("/login", user_controller.login_get);

router.get("/register", user_controller.register_get);

router.post("/register", user_controller.register_post);

router.get("/create-user", authorizor.isAdmin, user_controller.new_user_get);

router.post("/create-user", authorizor.isAdmin, user_controller.new_user_post);

router.get("/users", authorizor.isAdmin, user_controller.list_users);

module.exports = router;
