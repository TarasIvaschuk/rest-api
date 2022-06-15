const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { body } = require("express-validator");
const isAuth = require("../middleware/is-auth");

const User = require("../models/user");

router.put("/signup", [
  body("email")
    .isEmail()
    .withMessage("Please enter the valid email")
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then(userDoc => {
        if (userDoc) {
          return Promise.reject("Email address already exists!!");
        }
      }
      );
    }
    )
    .normalizeEmail(),
  body("password")
    .trim()
    .isLength({ min: 5 }),
  body("name")
    .trim()
    .not()
    .isEmpty(),

], authController.signup);

router.post("/login", authController.login);
router.get("/status", isAuth, authController.status);
router.put("/status", isAuth, [
  body("userStatus")
    .trim()
    .not()
    .isEmpty()
], authController.updateStatus);

module.exports = router;