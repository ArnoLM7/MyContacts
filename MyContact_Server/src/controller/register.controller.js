const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const asyncHandler = require("express-async-handler");

const register = asyncHandler(async (req, res) => {
	const { fullName, email, password } = req.body;

	// Vérification si l'email existe déjà
	const existingUser = await userModel.findOne({ email });
	if (existingUser) {
		return res.status(403).json({ message: "Email déjà utilisé" });
	}

	// Hash du mot de passe
	const hashedPassword = await bcrypt.hash(password, 10);

	// Création de l'utilisateur
	const user = await userModel.create({
		fullName,
		email,
		password: hashedPassword,
		createdAt: new Date(),
	});

	// Génération d’un token direct
	const token = jwt.sign(
		{ id: user._id, email: user.email },
		process.env.JWT_SECRET,
		{ expiresIn: "1h" }
	);

	return res.status(201).json({
		message: "Utilisateur créé",
		accessToken: token,
		success: true,
	});
});

module.exports = { register };
