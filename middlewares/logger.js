const fs = require("fs");
const path = require("path");

// Путь к файлу логов
const logFilePath = path.join(__dirname, "..", "logs", "requests.log");

// Создаем папку logs, если она не существует
if (!fs.existsSync(path.dirname(logFilePath))) {
  fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
}

// Middleware для логирования
const logger = (req, res, next) => {
  const startTime = Date.now(); // Время начала обработки запроса

  // Логируем информацию о запросе
  const logRequest = () => {
    const duration = Date.now() - startTime; // Время выполнения запроса
    const logMessage = `${new Date().toISOString()} - ${req.method} ${
      req.originalUrl
    } - ${res.statusCode} - ${duration}ms\n`;

    // Выводим в консоль
    console.log(logMessage.trim());

    // Записываем в файл
    fs.appendFile(logFilePath, logMessage, (err) => {
      if (err) {
        console.error("Ошибка при записи в лог-файл:", err);
      }
    });
  };

  // Логируем информацию о запросе после завершения обработки
  res.on("finish", logRequest);

  // Передаем управление следующему middleware
  next();
};

module.exports = logger;
