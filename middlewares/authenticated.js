const { verify } = require("../helpers/mapToken");
const User = require("../models/User");

module.exports = async function (req, res, next) {
  try {
    // Получаем токен из cookies или заголовка Authorization
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Токен отсутствует" });
    }

    // Верифицируем токен
    const tokenData = verify(token);

    // Ищем пользователя в базе данных
    const user = await User.findOne({ _id: tokenData.id });

    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    // Удаляем пароль из объекта пользователя
    user.password = undefined;

    // Добавляем пользователя в запрос
    req.user = user;

    // Передаем управление следующему middleware
    next();
  } catch (error) {
    // Обрабатываем ошибки верификации токена
    return res.status(401).json({ error: "Недействительный токен" });
  }
};
