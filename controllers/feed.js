exports.getPosts = (req, res, next) => {
  return res.status(200).json({
    posts: [
      {
        _id: '1',
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