const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../config/db");

// Util para gerar token JWT
function gerarToken(usuarioId, isTechnician) {
  return jwt.sign({ id: usuarioId, isTechnician }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
}

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar usuário pelo email
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Email ou senha inválidos." });
    }

    const usuario = rows[0];

    // Verificar a senha
    const senhaValida = await bcrypt.compare(password, usuario.password);
    if (!senhaValida) {
      return res.status(401).json({ message: "Email ou senha inválidos." });
    }

    // Gerar token
    const token = gerarToken(usuario.id, usuario.is_technician);

    // Retornar dados relevantes (VERIFICAR - CORPO DA RESPOSTA NO POSTMAN ESTA RETORNANDO O TOKEN, TEM QUE RETORNA O CORPO COMPLETO)
    res.json({
      message: "Login realizado com sucesso!",
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.full_name,
        email: usuario.email,
        isTechnician: !!usuario.is_technician,
      },
    });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ message: "Erro interno ao fazer login." });
  }
};
