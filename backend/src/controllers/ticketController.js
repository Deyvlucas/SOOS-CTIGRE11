const db = require("../config/db");

// Criar um novo chamado
exports.criarChamado = async (req, res) => {
  console.log("Criando chamado..."); // Adiciona este log para ver se a função é chamada
  const { title, description } = req.body;
  const userId = req.user.id;

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Título e descrição são obrigatórios." });
  }

  try {
    await db.execute(
      `INSERT INTO tickets (user_id, title, description, status, created_at) VALUES (?, ?, ?, 'PENDENTE', NOW())`,
      [userId, title, description]
    );
    res.status(201).json({ message: "Chamado criado com sucesso!" });
  } catch (error) {
    console.error("Erro ao criar chamado:", error);
    res.status(500).json({ message: "Erro ao criar chamado." });
  }
};

// Listar chamados do usuário autenticado
exports.listarMeusChamados = async (req, res) => {
  const userId = req.user.id;

  try {
    const [chamados] = await db.execute(
      `SELECT id, title, status, created_at FROM tickets WHERE user_id = ? ORDER BY created_at DESC`,
      [userId]
    );
    res.json(chamados);
  } catch (error) {
    console.error("Erro ao buscar chamados do usuário:", error);
    res.status(500).json({ message: "Erro ao buscar chamados." });
  }
};

// Listar todos os chamados (para técnicos)
exports.listarTodosChamados = async (req, res) => {
  try {
    const [chamados] = await db.execute(
      `SELECT tickets.*, users.full_name, users.email FROM tickets
       JOIN users ON tickets.user_id = users.id
       ORDER BY tickets.created_at DESC`
    );
    res.json(chamados);
  } catch (error) {
    console.error("Erro ao listar chamados:", error);
    res.status(500).json({ message: "Erro ao listar chamados." });
  }
};

// Resolver chamado
exports.resolverChamado = async (req, res) => {
  const ticketId = req.params.id;
  const { resolution } = req.body;

  try {
    const [result] = await db.execute(
      `UPDATE tickets SET status = 'RESOLVIDO', resolution = ?, resolved_at = NOW() WHERE id = ?`,
      [resolution, ticketId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Chamado não encontrado." });
    }

    res.json({ message: "Chamado marcado como resolvido." });
  } catch (error) {
    console.error("Erro ao resolver chamado:", error);
    res.status(500).json({ message: "Erro ao resolver chamado." });
  }
};
