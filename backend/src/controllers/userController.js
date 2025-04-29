const bcrypt = require("bcryptjs");
const pool = require("../config/db");

exports.register = async (req, res) => {
  const {
    fullName,
    whatsapp,
    networkLogin,
    gre11,
    gre11Sector,
    schools,
    schoolName,
    email,
    password,
  } = req.body;

  try {
    // Verifica se email já está cadastrado
    const [existing] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );
    if (existing.length > 0) {
      return res.status(400).json({ message: "Email já cadastrado." });
    }

    // Hashear a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserir novo usuário
    await pool.query(
      `INSERT INTO users (full_name, whatsapp, network_login, gre11, gre11_sector, schools, school_name, email, password)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        fullName,
        whatsapp,
        networkLogin,
        gre11,
        gre11Sector,
        schools,
        schoolName,
        email,
        hashedPassword,
      ]
    );

    res.status(201).json({ message: "Usuário cadastrado com sucesso." });
  } catch (error) {
    console.error("Erro no registro:", error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
};
