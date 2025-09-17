import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
	const navigate = useNavigate();
	const APIURL = import.meta.env.VITE_API_URL;

	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [loading, setLoading] = useState(false);

	const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");
		setLoading(true);

		const formData = new FormData(e.target);
		const email = formData.get("email")?.toString().trim();
		const fullName = formData.get("fullName")?.toString().trim();
		const password = formData.get("password")?.toString().trim();

		if (!validateEmail(email)) {
			setLoading(false);
			return setError("Veuillez entrer un email valide.");
		}

		if (!fullName || fullName.length < 2 || fullName.length > 20) {
			setLoading(false);
			return setError(
				"Le prénom/username doit contenir entre 2 et 20 caractères."
			);
		}

		if (!password || password.length < 8) {
			setLoading(false);
			return setError("Le mot de passe doit contenir au moins 8 caractères.");
		}

		try {
			const response = await fetch(`${APIURL}/auth/register`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					fullName,
					email,
					password,
					createdAt: new Date(),
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				setLoading(false);
				return setError(data.message || "Erreur lors de l'inscription.");
			}

			setSuccess("Compte créé avec succès !");
			localStorage.setItem("token", data.accessToken);
			e.target.reset();
			navigate("/contacts");
		} catch (err) {
			console.error("Erreur serveur :", err);
			setError("Impossible de contacter le serveur: " + err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
			<div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
				<h1 className="text-4xl font-bold mb-6 text-center font-mono">
					S'inscrire
				</h1>

				{error && <p className="text-red-600 mb-4 text-center">{error}</p>}
				{success && (
					<p className="text-green-600 mb-4 text-center">{success}</p>
				)}

				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<div className="flex flex-col">
						<label htmlFor="email" className="mb-1 font-medium font-mono">
							Email :
						</label>
						<input
							type="email"
							id="email"
							name="email"
							required
							className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-800 font-mono"
						/>
					</div>

					<div className="flex flex-col">
						<label htmlFor="fullName" className="mb-1 font-medium font-mono">
							Prénom :
						</label>
						<input
							type="text"
							id="fullName"
							name="fullName"
							required
							className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-800 font-mono"
						/>
					</div>

					<div className="flex flex-col">
						<label htmlFor="password" className="mb-1 font-medium font-mono">
							Mot de passe :
						</label>
						<input
							type="password"
							id="password"
							name="password"
							required
							className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-800 font-mono"
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className={`w-full py-2 rounded-3xl text-white font-semibold font-mono ${
							loading ? "bg-blue-300" : "bg-indigo-800 hover:bg-indigo-950"
						}`}
					>
						{loading ? "Inscription..." : "S'inscrire"}
					</button>
				</form>

				<p className="mt-4 text-center text-gray-600">
					<Link to="/" className="text-blue-500 hover:underline font-mono">
						Vous avez déjà un compte ? Se connecter
					</Link>
				</p>
			</div>
		</div>
	);
}
