const mongoose = require("mongoose");
const roles = require("../constants/roles");

const UserSchema = mongoose.Schema(
  {
    login: {
      type: String,
      required: [true, "Логин обязателен"],
      unique: true,
      minlength: [3, "Логин должен содержать не менее 3 символов"],
      maxlength: [20, "Логин не может превышать 20 символов"],
      match: [
        /^[a-zA-Z0-9_]+$/,
        "Логин может содержать только буквы, цифры и подчеркивания",
      ],
    },
    password: {
      type: String,
      required: [true, "Пароль обязателен"],
      minlength: [6, "Пароль должен содержать не менее 6 символов"],
    },
    role: {
      type: Number,
      default: roles.USER,
      enum: {
        values: Object.values(roles),
        message: "Недопустимая роль пользователя",
      },
    },
  },
  { timestamps: true }
);

// Индекс для ускорения поиска по логину
UserSchema.index({ login: 1 });

const User = mongoose.model("User", UserSchema);

module.exports = User;
