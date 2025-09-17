const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const asyncHandler = require("express-async-handler");

// Inscription d'un nouvel utilisateur
const register = asyncHandler(async (req, res) => {
	const { fullName, email, createdAt } = req.body;

	// On vérifie si l'email existe déjà
	const verifyEmail = await userModel.findOne({ email: email });
	try {
		if (verifyEmail) {
			return res.status(403).json({
				message: "Email already used",
			});
		} else {
			// Hashage du mot de passe
			bcrypt.hash(req.body.password, 10).then((hash) => {
				// Création d'un nouvel utilisateur
				const user = new userModel({
					fullName: fullName,
					email: email,
					password: hash,
					createdAt: createdAt,
				});

				// Création de l'utilisateur dans la base de données
				user
					.save()
					.then((response) => {
						return res.status(201).json({
							message: "user successfully created!",
							result: response,
							success: true,
						});
					})
					.catch((error) => {
						res.status(500).json({
							error: error,
						});
					});
			});
		}
	} catch (error) {
		return res.status(412).send({
			success: false,
			message: error.message,
		});
	}
});

module.exports = {
	register,
};
