const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");
const authMiddleware = require("../middlewares/authMiddleware");

// Aplicando o middleware de autenticação
router.use(authMiddleware);

// Abertura de novo chamado
router.post("/", ticketController.createTicket);

// Listar todos os chamados do usuário
router.get("/my", ticketController.getMyTickets);

// Técnicos: listar todos os chamados
router.get("/all", ticketController.getAllTickets);

// Técnicos: resolver um chamado
router.put("/resolve/:id", ticketController.resolveTicket);

module.exports = router;
