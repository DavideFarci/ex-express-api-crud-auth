const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { checkSchema } = require("express-validator");
const userRegister = require("../validations/userRegister");
const { checkValidity } = require("../middlwares/schemaValidator");

router.post(
  "/register",
  // Controlla che non ci siano errori nei dati passati
  checkSchema(userRegister),
  // Mi da l'errore se è presente. In questo modo non devo gestirli manualmente
  checkValidity,
  userController.register
);

router.post("/login", userController.login);

module.exports = router;
