const { validationResult } = require("express-validator");
const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
  Post.find()
    .then(posts => res.status(200).json({
      message: "Fetched posts successfully",
      posts
    }))
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
        return next(err);
      }
    });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  const { title, content } = req.body;
  console.log(req);

  if (!errors.isEmpty()) {
    const err = new Error("Validation failed, entered data is incorrect");
    err.statusCode = 422;
    return next(err);
    // throw error;
  }
  if (!req.file) {
    const err = new Error("No image provided");
    err.statusCode = 422;
    throw err;
  }

  const imageUrl = req.file.path;
  const post = new Post({
    title,
    content,
    imageUrl,
    creator: {
      name: "Taras"
    },
  });

  // noinspection JSUnresolvedFunction
  post.save()
    .then((result) => {
      console.log(result);
      return res.status(201).json({
        message: "Post created successfully",
        post: result
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
        return next(err);
      }
    });
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then(post => {
      if (!post) {
        const err = new Error("Could not find the post");
        err.statusCode = 404;
        throw err;
      }
      return res.status(200).json({ message: "Post fetched ", post });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
        return next(err);
      }
    });
};