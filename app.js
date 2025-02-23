const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./db");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const { PORT } = require("./config");

const app = express();

// Подключение middleware
app.use(cookieParser());
app.use(express.json());
app.use(logger);

// Подключение маршрутов
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

// Централизованный обработчик ошибок
app.use(errorHandler);

// Подключение к базе данных и запуск сервера
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
