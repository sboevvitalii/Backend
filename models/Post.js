const mongoose = require("mongoose");
const validator = require("validator");

const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Заголовок обязателен"],
      minlength: [3, "Заголовок должен содержать не менее 3 символов"],
      maxlength: [100, "Заголовок не может превышать 100 символов"],
    },
    image: {
      type: String,
      required: [true, "Изображение обязательно"],
      validate: {
        validator: validator.isURL,
        message: "Изображение должно быть действительным URL",
      },
    },
    content: {
      type: String,
      required: [true, "Содержание обязательно"],
      minlength: [10, "Содержание должно содержать не менее 10 символов"],
      maxlength: [5000, "Содержание не может превышать 5000 символов"],
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

// Индекс для ускорения поиска по заголовку
PostSchema.index({ title: 1 });

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
