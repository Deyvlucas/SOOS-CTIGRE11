const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Cadastro de novo usuário
router.post("/register", userController.register);

module.exports = router;
