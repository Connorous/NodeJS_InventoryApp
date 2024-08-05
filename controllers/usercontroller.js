const User = require("../models/user");
const passport = require("../appPassport");
const bcrypt = require("bcryptjs");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display user login form on GET.
exports.login_get = asyncHandler(async (req, res, next) => {
  res.render("user_form", { title: "Log In" });
});

// Display user create form on GET.
exports.register_get = asyncHandler(async (req, res, next) => {
  res.render("user_form", { title: "Register" });
});

// Handle user create on POST.
exports.register_post = [
  // Validate and sanitize fields.
  body("username", "Username must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "password must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      res.render("user_form", {
        title: "Register",
        errors: errors.array(),
      });
    } else {
      // Data from form is valid.
      // Check if User with same username already exists.
      const userExists = await User.findOne({ username: req.body.username })
        .collation({ locale: "en", strength: 2 })
        .exec();
      if (userExists) {
        // User exists, redisplay form
        res.redirect("/", {
          title: "Register",
          messsage: "User with the username provided already exists",
        });
      } else {
        // Create a User object with escaped and trimmed data. Encrypting the user's password
        try {
          var password = req.body.password;
          bcrypt.hash(password, 10, async (err, hashedPassword) => {
            // if err, do something
            // otherwise, store hashedPassword in DB

            const user = new User({
              username: req.body.username,
              password: hashedPassword,
              admin: false,
            });
            const newUser = await user.save();
            res.redirect("/");
          });
        } catch (err) {
          return next(err);
        }
      }
    }
  }),
];

// Display user create form on GET.
exports.new_user_get = asyncHandler(async (req, res, next) => {
  res.render("new_user_form", { title: "Create New User", admin: true });
});

// Handle user create on POST.
exports.new_user_post = [
  // Validate and sanitize fields.
  body("username", "Username must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "password must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      res.render("new_user_form", {
        title: "Create New User",
        errors: errors.array(),
      });
    } else {
      // Data from form is valid.
      // Check if User with same username already exists.
      const userExists = await User.findOne({ username: req.body.username })
        .collation({ locale: "en", strength: 2 })
        .exec();
      if (userExists) {
        // User exists, redisplay form
        res.redirect("/", {
          title: "Create New User",
          messsage: "User with the username provided already exists",
        });
      } else {
        // Create a User object with escaped and trimmed data. Encrypting the user's password
        try {
          var password = req.body.password;
          bcrypt.hash(password, 10, async (err, hashedPassword) => {
            // if err, do something
            // otherwise, store hashedPassword in DB

            const user = new User({
              username: req.body.username,
              password: hashedPassword,
              admin: Boolean(req.body.admin),
            });
            const newUser = await user.save();
            res.redirect("/");
          });
        } catch (err) {
          return next(err);
        }
      }
    }
  }),
];

// Display list of all users.
exports.list_users = asyncHandler(async (req, res, next) => {
  const allUsers = await User.find({}, "username admin")
    .sort({ username: 1 })
    .exec();

  res.render("user_list", { title: "List of Users", user_list: allUsers });
});
