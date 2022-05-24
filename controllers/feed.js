exports.getPosts = (req, res, next) => {
  return res.status(200).json({post: [{title: "My first post"}, {content: "Hello World"}]});
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.title;

  return res.status(201).json({
    message: "Post created successfully",
    post: {
      id: new Date().toISOString(),
      title,
      content
    }
  });
};