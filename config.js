require("dotenv").config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || "default_secret_key",
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT || 3001,
};
