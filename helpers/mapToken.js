const jwt = require("jsonwebtoken");

// Секретный ключ из переменных окружения
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

module.exports = {
  /**
   * Генерация JWT-токена.
   * @param {object} data - Данные для включения в токен (например, userId).
   * @param {string} [expiresIn="30d"] - Время жизни токена.
   * @returns {string} - Сгенерированный токен.
   */
  generate(data, expiresIn = "30d") {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET не задан");
    }
    return jwt.sign(data, JWT_SECRET, { expiresIn });
  },

  /**
   * Верификация JWT-токена.
   * @param {string} token - Токен для верификации.
   * @returns {object} - Расшифрованные данные из токена.
   * @throws {Error} - Если токен недействителен.
   */
  verify(token) {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET не задан");
    }
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error("Недействительный токен: " + error.message);
    }
  },
};
