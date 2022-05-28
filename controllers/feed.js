const { validationResult } = require("express-validator");
const Post = require("../models/post");

exports.getPosts = (req, res) => {
  return res.status(200).json({
    posts: [
      {
        _id: "1",
        title: "My first post",
        content: "Hello World",
        imageUrl: "images/duck.jpg",
        creator: {
          name: "Taras"
        },
        createdAt: new Date()
      }
    ]
  });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  const { title, content } = req.body;

  if (!errors.isEmpty()) {
    const err = new Error("Validation failed, entered data is incorrect");
    err.statusCode = 422;
    return next(err);
    // throw error;
  }

  const post = new Post({
    title,
    content,
    imageUrl: "images/duck.jpg",
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
