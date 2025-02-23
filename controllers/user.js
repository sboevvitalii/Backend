/**
 * Регистрация нового пользователя.
 * @param {string} login - Логин пользователя.
 * @param {string} password - Пароль пользователя.
 * @returns {object} - Зарегистрированный пользователь.
 * @throws {Error} - Если пользователь с таким логином уже существует.
 */
async function register(login, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ login, password: passwordHash });
  return user;
}
