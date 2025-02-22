const express = require("express");
const router = express.Router();
const {
  addPost,
  editPost,
  deletePost,
  getPosts,
  getPost,
} = require("../controllers/post");
const mapPost = require("../helpers/mapPost");
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const ROLES = require("../constants/roles");

// Получение списка постов
router.get("/", async (req, res) => {
  const { posts, lastPage } = await getPosts(
    req.query.search,
    req.query.limit,
    req.query.page
  );
  res.send({ data: { lastPage, posts: posts.map(mapPost) } });
});

// Получение одного поста
router.get("/:id", async (req, res) => {
  const post = await getPost(req.params.id);

  res.send({ data: mapPost(post) });
});

// Добавление постов (только для админа)
router.post("/", hasRole([ROLES.ADMIN]), async (req, res) => {
  const newPost = await addPost({
    title: req.body.title,
    content: req.body.content,
    image: req.body.imageUrl,
  });
  res.send({ data: mapPost(newPost) });
});

// Редактирование поста (только для админа)
router.patch("/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  const updatePost = await editPost(req.params.id, {
    title: req.body.title,
    content: req.body.content,
    image: req.body.imageUrl,
  });
  res.send({ data: mapPost(updatePost) });
});

// Удаление поста (только для админа)
router.delete("/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  await deletePost(req.params.id);

  res.send({ error: null });
});

module.exports = router;
