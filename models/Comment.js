const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Содержание комментария обязательно"],
      minlength: [1, "Содержание комментария не может быть пустым"],
      maxlength: [
        1000,
        "Содержание комментария не может превышать 1000 символов",
      ],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Автор комментария обязателен"],
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
