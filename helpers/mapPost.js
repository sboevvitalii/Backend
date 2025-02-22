const mongoose = require("mongoose");
const mapComment = require("./mapComment");
const { format } = require("date-fns"); // Для форматирования даты

module.exports = function (post) {
  if (!post) {
    throw new Error("Post is missing");
  }

  // Форматируем дату
  const publishedAt = post.createdAt
    ? format(new Date(post.createdAt), "yyyy-MM-dd HH:mm:ss")
    : "Unknown date";

  // Обрабатываем комментарии
  const comments = Array.isArray(post.comments)
    ? post.comments.map((comment) =>
        // Если комментарий — это ObjectId, возвращаем его как есть
        mongoose.isObjectIdOrHexString(comment) ? comment : mapComment(comment)
      )
    : [];

  return {
    id: post._id ? post._id.toString() : null, // Приводим ObjectId к строке
    title: post.title || "", // Если title отсутствует, возвращаем пустую строку
    imageUrl: post.image || null, // Если image отсутствует, возвращаем null
    content: post.content || "", // Если content отсутствует, возвращаем пустую строку
    comments,
    publishedAt,
  };
};
