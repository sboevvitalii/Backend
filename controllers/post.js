const Post = require("../models/Post");

// Добавление поста
async function addPost(post) {
  const newPost = await Post.create(post);
  await newPost.populate({
    path: "comments",
    populate: "author",
  });

  return newPost;
}

// Редактирование поста
async function editPost(id, post) {
  const updatedPost = await Post.findByIdAndUpdate(id, post, {
    returnDocument: "after",
  }).populate({
    path: "comments",
    populate: "author",
  });

  if (!updatedPost) {
    throw new Error("Пост не найден");
  }

  return updatedPost;
}

// Удаление поста
async function deletePost(id) {
  const result = await Post.deleteOne({ _id: id });

  if (result.deletedCount === 0) {
    throw new Error("Пост не найден");
  }

  return result;
}

// Получение списка постов с пагинацией и поиском
async function getPosts(search = "", limit = 10, page = 1) {
  const [posts, count] = await Promise.all([
    Post.find({ title: { $regex: search, $options: "i" } })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .populate({
        path: "comments",
        populate: "author",
      }),
    Post.countDocuments({ title: { $regex: search, $options: "i" } }),
  ]);

  return { posts, lastPage: Math.ceil(count / limit) };
}

// Получение одного поста
async function getPost(id) {
  const post = await Post.findById(id).populate({
    path: "comments",
    populate: "author",
  });

  if (!post) {
    throw new Error("Пост не найден");
  }

  return post;
}

module.exports = {
  addPost,
  editPost,
  deletePost,
  getPosts,
  getPost,
};
