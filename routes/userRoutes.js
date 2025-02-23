const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/user");
const {
  validateRegistration,
  validateLogin,
  handleValidationErrors,
} = require("../middlewares/validate");

router.post(
  "/register",
  validateRegistration,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { user, token } = await register(req.body.login, req.body.password);
      res.cookie("token", token, { httpOnly: true }).json({ user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.post(
  "/login",
  validateLogin,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { user, token } = await login(req.body.login, req.body.password);
      res.cookie("token", token, { httpOnly: true }).json({ user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
