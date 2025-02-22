const Comment = require("../models/Comment");
const Post = require("../models/Post");

// Добавление комментария
async function addComment(postId, comment) {
  const newComment = await Comment.create(comment);
  await Post.findByIdAndUpdate(postId, { $push: { comments: newComment._id } });
  await newComment.populate("author");

  return newComment;
}

// Получение списка комментариев поста
async function getCommentsByPostId(postId) {
  const post = await Post.findById(postId).populate({
    path: "comments",
    populate: { path: "author" }, // Загружаем автора каждого комментария
  });

  return post.comments;
}

// Удаление комментария
async function deleteComment(postId, commentId) {
  await Comment.deleteOne({ _id: commentId });
  await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } });
}

module.exports = { addComment, deleteComment, getCommentsByPostId };
