const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generate } = require("../helpers/mapToken");
const { ADMIN, MODERATOR, USER } = require("../constants/roles"); // Импортируем константы

// Регистрация
async function register(login, password) {
  if (!password) {
    throw new Error("Password is empty");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ login, password: passwordHash });
    const token = generate({ id: user.id });

    user.password = undefined;
    return { token, user };
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("User with this login already exists");
    }
    throw error;
  }
}

// Логин
async function login(login, password) {
  const user = await User.findOne({ login }).select("+password");

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Wrong password");
  }

  const token = generate({ id: user.id });
  user.password = undefined;

  return { token, user };
}

// Получение всех пользователей
async function getUsers() {
  return await User.find();
}

// Получение ролей из констант
async function getRoles() {
  return {
    ADMIN,
    MODERATOR,
    USER,
  };
}

// Удаление пользователя
async function deleteUser(id, currentUserId) {
  if (id === currentUserId) {
    throw new Error("You cannot delete yourself");
  }

  const result = await User.deleteOne({ _id: id });

  if (result.deletedCount === 0) {
    throw new Error("User not found");
  }

  return result;
}

// Обновление пользователя
async function updateUser(id, userData) {
  const updatedUser = await User.findByIdAndUpdate(id, userData, {
    returnDocument: "after",
  });

  if (!updatedUser) {
    throw new Error("User not found");
  }

  updatedUser.password = undefined;
  return updatedUser;
}

module.exports = {
  register,
  login,
  getUsers,
  getRoles,
  deleteUser,
  updateUser,
};
