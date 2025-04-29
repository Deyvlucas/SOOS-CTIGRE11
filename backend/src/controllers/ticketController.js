const pool = require("../config/db");

exports.createTicket = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;

  try {
    await pool.query(
      `INSERT INTO tickets (user_id, title, description, status, created_at)
      VALUES (?, ?, ?, 'PENDENTE', NOW())`,
      [userId, title, description]
    );

    res.status(201).json({ message: "Chamado criado com sucesso." });
  } catch (error) {
    console.error("Erro ao criar chamado:", error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
};

exports.getMyTickets = async (req, res) => {
  const userId = req.user.id;

  try {
    const [tickets] = await pool.query(
      `SELECT id, title, description, status, created_at
       FROM tickets WHERE user_id = ? ORDER BY created_at DESC`,
      [userId]
    );

    res.json(tickets);
  } catch (error) {
    console.error("Erro ao buscar chamados:", error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
};

exports.getAllTickets = async (req, res) => {
  try {
    const [tickets] = await pool.query(
      `SELECT t.id, u.full_name, u.email, t.title, t.description, t.status, t.created_at
       FROM tickets t
       JOIN users u ON t.user_id = u.id
       ORDER BY t.created_at DESC`
    );

    res.json(tickets);
  } catch (error) {
    console.error("Erro ao buscar todos os chamados:", error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
};

exports.resolveTicket = async (req, res) => {
  const ticketId = req.params.id;
  const { resolutionComment } = req.body;

  try {
    await pool.query(
      `UPDATE tickets SET status = 'RESOLVIDO', resolution_comment = ?, resolved_at = NOW() WHERE id = ?`,
      [resolutionComment, ticketId]
    );

    res.json({ message: "Chamado resolvido com sucesso." });
  } catch (error) {
    console.error("Erro ao resolver chamado:", error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
};
