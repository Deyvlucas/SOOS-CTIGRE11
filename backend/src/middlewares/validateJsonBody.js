// src/middlewares/validateJsonBody.js

module.exports = (req, res, next) => {
  const methodsToCheck = ["POST", "PUT", "PATCH"];

  if (methodsToCheck.includes(req.method)) {
    // Verifica se Content-Type é application/json
    const contentType = req.headers["content-type"];
    if (!contentType || !contentType.includes("application/json")) {
      return res.status(415).json({
        message: "Content-Type inválido. Use application/json.",
      });
    }

    // Verifica se o corpo está vazio
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Corpo da requisição vazio. Envie um JSON válido.",
      });
    }
  }

  next(); // Continua a requisição
};
