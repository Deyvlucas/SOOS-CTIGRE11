const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");
const authMiddleware = require("../middlewares/authMiddleware");

// Criar chamado
router.post("/criar", authMiddleware, ticketController.criarChamado);

// Listar chamados do próprio usuário
router.get("/meus", authMiddleware, ticketController.listarMeusChamados);

// Listar todos os chamados (técnico)
router.get("/todos", authMiddleware, ticketController.listarTodosChamados);

// Marcar como resolvido (técnico)
router.patch("/resolver/:id", authMiddleware, ticketController.resolverChamado);

module.exports = router;
