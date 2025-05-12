const db = require("../config/db");
const bcrypt = require("bcryptjs");

// Função para validar e-mail com domínio permitido
function emailValido(email) {
  return (
    email.endsWith("@adm.educacao.pe.gov.br") ||
    email.endsWith("@professor.educacao.pe.gov.br")
  );
}

exports.register = async (req, res) => {
  // Verifica se o corpo da requisição está vazio
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message:
        "Corpo da requisição vazio. Certifique-se de enviar os dados como JSON e definir o Content-Type como application/json.",
    });
  }
  const {
    full_name,
    whatsapp,
    network_login,
    gre11,
    gre11_sector,
    schools,
    school_name,
    email,
    password,
    confirm_password,
  } = req.body;

  // Validações básicas
  if (
    !full_name ||
    !whatsapp ||
    !network_login ||
    !gre11 ||
    !schools ||
    !email ||
    !password ||
    !confirm_password
  ) {
    return res
      .status(400)
      .json({ message: "Todos os campos obrigatórios devem ser preenchidos." });
  }

  if (!emailValido(email)) {
    return res.status(400).json({
      message: "Email inválido. Use um email institucional permitido.",
    });
  }

  if (password !== confirm_password) {
    return res.status(400).json({ message: "As senhas não coincidem." });
  }

  try {
    // Verifica se e-mail já está cadastrado
    const [existing] = await db.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );
    if (existing.length > 0) {
      return res
        .status(409)
        .json({ message: "Este e-mail já está cadastrado." });
    }

    // Criptografar senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserir no banco de dados
    await db.execute(
      `INSERT INTO users 
      (full_name, whatsapp, network_login, gre11, gre11_sector, schools, school_name, email, password, is_technician)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, false)`,
      [
        full_name,
        whatsapp,
        network_login,
        gre11,
        gre11 === "SIM" ? gre11_sector : null,
        schools,
        schools === "SIM" ? school_name : null,
        email,
        hashedPassword,
      ]
    );

    return res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.status(500).json({ message: "Erro interno ao cadastrar usuário." });
  }
};

exports.getPerfil = async (req, res) => {
  const userId = req.user.id;

  try {
    const [rows] = await db.execute(
      `SELECT id, full_name, whatsapp, network_login, gre11, gre11_sector, schools, school_name, email, is_technician 
       FROM users 
       WHERE id = ?`,
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    res
      .status(500)
      .json({ message: "Erro ao buscar perfil.", error: error.message });
  }
};
