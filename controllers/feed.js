const {validationResult} = require("express-validator");

exports.getPosts = (req, res, next) => {
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
  })
    ;
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  const title = req.body.title;
  const content = req.body.content;

  if(!errors.isEmpty()){
    return res.status(422).json({
      message: "Validation failed, entered data is incorrect",
      errors: errors.array()
    })
  }

  return res.status(201).json({
    message: "Post created successfully",
    post: {
      _id: new Date().toISOString(),
      title,
      content,
      creator: {
        name: "Taras"
      },
      createdAt: new Date()
    }
  });
};