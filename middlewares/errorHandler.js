const errorHandler = (err, req, res, next) => {
  // Логирование ошибки (можно заменить на запись в файл или отправку в сервис мониторинга)
  console.error("Ошибка:", err.message);

  // Определение статуса ошибки
  const statusCode = err.statusCode || 500;

  // Определение сообщения об ошибке
  const message = err.message || "Внутренняя ошибка сервера";

  // Отправка ответа клиенту
  res.status(statusCode).json({
    success: false,
    message: message,
    // В development-режиме можно добавить стек вызовов для отладки
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = errorHandler;
