const express = require("express");
const router = express.Router();
const feedController = require("../controllers/feed");
const {body} = require("express-validator");


router.get("/posts", feedController.getPosts);
router.post("/post", [
  body('title')
    .trim()
    .isLength({min:7}),
  body('content')
    .trim()
    .isLength({min:7})
],feedController.createPost);

module.exports = router;