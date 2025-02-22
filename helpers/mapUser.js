module.exports = function (user) {
  if (!user) {
    throw new Error("User is missing");
  }

  return {
    id: user._id ? user._id.toString() : null, // Приводим ObjectId к строке
    login: user.login || "", // Если login отсутствует, возвращаем пустую строку
    roleId: user.role || null, // Если role отсутствует, возвращаем null
  };
};
