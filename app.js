const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const { errorHandler } = require("./middlewares/errorHandler");
const logger = require("./middlewares/logger");

const port = process.env.PORT || 3001;
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

// Подключение к MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });
