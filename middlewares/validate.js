const { body, validationResult } = require("express-validator");

const validateRegistration = [
  body("login")
    .isLength({ min: 3 })
    .withMessage("Логин должен содержать не менее 3 символов"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Пароль должен содержать не менее 6 символов"),
];

const validateLogin = [
  body("login").notEmpty().withMessage("Логин обязателен"),
  body("password").notEmpty().withMessage("Пароль обязателен"),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  handleValidationErrors,
};
