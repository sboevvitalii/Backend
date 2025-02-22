module.exports = function (roles) {
  // Если roles передана не как массив, преобразуем в массив
  if (!Array.isArray(roles)) {
    roles = [roles];
  }

  return async (req, res, next) => {
    try {
      // Проверяем, что пользователь аутентифицирован
      if (!req.user) {
        return res
          .status(401)
          .json({ error: "Пользователь не аутентифицирован" });
      }

      // Получаем роль пользователя
      const userRole = req.user.role;

      // Проверяем, есть ли роль пользователя в списке разрешенных
      if (!roles.includes(userRole)) {
        return res.status(403).json({
          error: "Доступ запрещен",
          message: `Требуемые роли: ${roles.join(", ")}`,
        });
      }

      // Если роль подходит, передаем управление следующему middleware
      next();
    } catch (error) {
      // Передаем ошибку в централизованный обработчик ошибок
      next(error);
    }
  };
};
