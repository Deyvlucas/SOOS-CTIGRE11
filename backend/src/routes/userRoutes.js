const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", userController.register);

// Adicione esta rota para o perfil
router.get("/perfil", authMiddleware, userController.getPerfil);

module.exports = router;
