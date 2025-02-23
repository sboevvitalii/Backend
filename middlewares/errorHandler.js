const errorHandler = (err, req, res, next) => {
  console.error("Ошибка:", err.message);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Внутренняя ошибка сервера";

  res.status(statusCode).json({
    success: false,
    message: message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = errorHandler;
