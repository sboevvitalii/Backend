const { format } = require("date-fns"); // Для форматирования даты

module.exports = function (comment) {
  if (!comment) {
    throw new Error("Comment is missing");
  }

  // Проверяем, есть ли автор и его логин
  const authorName = comment.author?.login || "Unknown";

  // Форматируем дату
  const publishedAt = comment.createdAt
    ? format(new Date(comment.createdAt), "yyyy-MM-dd HH:mm:ss")
    : "Unknown date";

  return {
    content: comment.content || "", // Если content отсутствует, возвращаем пустую строку
    author: authorName,
    id: comment._id ? comment._id.toString() : null, // Приводим ObjectId к строке
    publishedAt,
  };
};
