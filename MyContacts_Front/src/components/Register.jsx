import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
	const APIURL = import.meta.env.VITE_API_URL;

	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const validateEmail = (email) => {
		return /\S+@\S+\.\S+/.test(email);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");
		const formData = new FormData(e.target);
		const email = formData.get("email")?.toString().trim();
		const firstname = formData.get("firstname")?.toString().trim();
		const password = formData.get("password")?.toString().trim();

		if (!validateEmail(email)) {
			return setError("Veuillez entrer un email valide.");
		}

		if (!firstname || firstname.length < 8 || firstname.length > 20) {
			return setError(
				"Le prénom/username doit contenir entre 8 et 20 caractères."
			);
		}

		if (!password || password.length < 8) {
			return setError("Le mot de passe doit contenir au moins 8 caractères.");
		}

		try {
			const response = await fetch(`${APIURL}/auth/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					fullName: firstname,
					email,
					password,
					createdAt: new Date(),
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				return setError(data.message || "Erreur lors de l'inscription.");
			}

			setSuccess("Compte créé avec succès !");
			e.target.reset();
		} catch (error) {
			setError("Impossible de contacter le serveur.");
		}
	};

	return (
		<div>
			<h1>S'inscrire</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="email">Email :</label>
					<input type="email" id="email" name="email" required />
				</div>
				<div>
					<label htmlFor="firstname">Prénom :</label>
					<input type="text" id="firstname" name="firstname" required />
				</div>
				<div>
					<label htmlFor="password">Mot de passe :</label>
					<input type="password" id="password" name="password" required />
				</div>
				<button type="submit">S'inscrire</button>
			</form>
			<Link to="/">
				<p>
					<strong>Vous avez déjà un compte ?</strong> Se connecter
				</p>
			</Link>
		</div>
	);
}
