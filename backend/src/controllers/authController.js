const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../config/db");
require("dotenv").config();

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar usuário pelo email
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    const user = rows[0];

    // Comparar a senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, isTechnician: user.is_technician },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
};
