const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

// Connexion de l'utilisateur
const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	let getUser;

	userModel
		// On cherche l'utilisateur par son email
		.findOne({
			email: email,
		})
		.then((user) => {
			if (!user) {
				return res.status(401).json({
					message: "Utilisateur inexistant",
				});
			}
			getUser = user;

			// On vérifie si le mot de passe est correct
			return bcrypt.compare(password, user.password);
		})
		.then((response) => {
			if (!response) {
				return res.status(401).json({
					message: "Mot de passe incorrect",
				});
			} else {
				// On génère un token JWT
				let jwtToken = jwt.sign(
					{
						id: getUser._id,
						email: getUser.email,
					},

					process.env.JWT_SECRET,
					{
						expiresIn: "1h",
					}
				);
				// On renvoie le token au client
				return res.status(200).json({
					accessToken: jwtToken,
				});
			}
		})
		.catch((err) => {
			return res.status(401).json({
				message: err.message,
				success: false,
			});
		});
});

module.exports = {
	login,
};
