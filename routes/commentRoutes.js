const express = require("express");
const router = express.Router();
const { addComment, deleteComment } = require("../controllers/comment");
const mapComment = require("../helpers/mapComment");
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const ROLES = require("../constants/roles");

// Добавление комментария
router.post("/posts/:id/comments", authenticated, async (req, res) => {
  const newComment = await addComment(req.params.id, {
    content: req.body.content,
    author: req.user.id,
  });
  res.send({ data: mapComment(newComment) });
});

// Удаление комментария (только для админов и модераторов)
router.delete(
  "/posts/:postId/comments/:commentId",
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    await deleteComment(req.params.postId, req.params.commentId);
    res.send({ error: null });
  }
);

module.exports = router;
