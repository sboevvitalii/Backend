const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUsers,
  getRoles,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const mapUser = require("../helpers/mapUser");
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const ROLES = require("../constants/roles");

// Регистрация
router.post("/register", async (req, res) => {
  try {
    const { user, token } = await register(req.body.login, req.body.password);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.status(500).send({ error: e.message || "Unknown error" });
  }
});

// Логин
router.post("/login", async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.status(500).send({ error: e.message || "Unknown error" });
  }
});

// Выход
router.post("/logout", (req, res) => {
  res
    .cookie("token", "", { httpOnly: true, secure: true, sameSite: "strict" })
    .send({});
});

// Получение пользователей (только для админов)
router.get("/", hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const users = await getUsers();
    res.send({ data: users.map(mapUser) });
  } catch (e) {
    res.status(500).send({ error: e.message || "Unknown error" });
  }
});

// Получение ролей (только для админов)
router.get("/roles", hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const roles = await getRoles();
    res.send({ data: roles });
  } catch (e) {
    res.status(500).send({ error: e.message || "Unknown error" });
  }
});

// Редактирование пользователей (только для админов)
router.patch("/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  const newUser = await updateUser(req.params.id, {
    role: req.body.roleId,
  });

  res.send({ data: mapUser(newUser) });
});

// Удаление пользователя (только для админов)
router.delete("/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  await deleteUser(req.params.id);

  res.send({ error: null });
});

module.exports = router;
