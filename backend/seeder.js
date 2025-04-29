const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");

// Dados de conexão com o MySQL (ajustado para seu Docker)
const dbConfig = {
  host: "localhost", // ou '127.0.0.1'
  user: "suporte_user",
  password: "gltecsystem",
  database: "suporte_tecnico",
  port: 3307,
};

async function seed() {
  const connection = await mysql.createConnection(dbConfig);

  console.log("Conectado ao banco de dados!");

  // Gerar senha hash
  const senhaHash = await bcrypt.hash("senha123", 10);

  // Usuarios para inserir
  const usuarios = [
    {
      full_name: "Administrador Técnico",
      whatsapp: "81911111111",
      network_login: "admin.login",
      gre11: "SIM",
      gre11_sector: null,
      schools: "NO",
      school_name: null,
      email: "ctigresmi@adm.educacao.pe.gov.br",
      password: senhaHash,
      is_technician: true,
    },
    {
      full_name: "Gabriel Gouveia",
      whatsapp: "81922222222",
      network_login: "gabriel.login",
      gre11: "SIM",
      gre11_sector: "Setor de TI",
      schools: "NO",
      school_name: null,
      email: "gabrielgouveia@adm.educacao.pe.gov.br",
      password: senhaHash,
      is_technician: false,
    },
    {
      full_name: "Deyvson Lucas",
      whatsapp: "81933333333",
      network_login: "deyvson.login",
      gre11: "SIM",
      gre11_sector: null,
      schools: "NO",
      school_name: null,
      email: "deyvsonlucas@adm.educacao.pe.gov.br",
      password: senhaHash,
      is_technician: false,
    },
  ];

  for (const user of usuarios) {
    await connection.execute(
      `INSERT INTO users 
      (full_name, whatsapp, network_login, gre11, gre11_sector, schools, school_name, email, password, is_technician)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.full_name,
        user.whatsapp,
        user.network_login,
        user.gre11,
        user.gre11_sector,
        user.schools,
        user.school_name,
        user.email,
        user.password,
        user.is_technician,
      ]
    );
    console.log(`Usuário ${user.full_name} inserido com sucesso!`);
  }

  await connection.end();
  console.log("Seed finalizado!");
}

// Rodar o seed
seed().catch((err) => {
  console.error("Erro ao executar o seed:", err);
});
