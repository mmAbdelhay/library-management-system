const authController = require("../controllers/Auth/AuthController");

module.exports = function (app) {
  app.post("/auth/login", authController.login);
  app.post("/auth/register", authController.register);
};

