const express = require("express");
const cors = require("cors");

const validateJsonBody = require("./middlewares/validateJsonBody");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const ticketRoutes = require("./routes/ticketRoutes");

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(validateJsonBody); // <-- aqui

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);

// Rota padrão
app.get("/", (req, res) => {
  res.send("API de Suporte Técnico - Rodando 🚀");
});

module.exports = app;
