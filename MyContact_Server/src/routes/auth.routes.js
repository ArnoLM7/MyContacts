const express = require("express");
const router = express.Router();

const {
	registerValidation,
	loginValidation,
} = require("../middleware/authvalidation.middleware");

const { login } = require("../controller/login.controller");
const { register } = require("../controller/register.controller");

// Route pour l'inscription avec la validation de l'inscription
router.post("/register", registerValidation, register);

// Route pour la connexion avec la validation de la connexion
router.post("/login", loginValidation, login);

module.exports = router;
