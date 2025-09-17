import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
	const APIURL = import.meta.env.VITE_API_URL;
	const navigate = useNavigate();

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		const formData = new FormData(e.target);
		const email = formData.get("email")?.toString().trim();
		const password = formData.get("password")?.toString().trim();

		if (!email || !password) {
			setLoading(false);
			return setError("Veuillez remplir tous les champs.");
		}

		try {
			const response = await fetch(`${APIURL}/auth/login`, {
				headers: { "Content-Type": "application/json" },
				method: "POST",
				body: JSON.stringify({ email, password }),
			});

			const data = await response.json();

			if (!response.ok) {
				setLoading(false);
				return setError(data.message || "Erreur de connexion.");
			}

			localStorage.setItem("token", data.accessToken);
			navigate("/contacts");
		} catch (err) {
			setError("Impossible de contacter le serveur: " + err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen p-4">
			<div className="w-full max-w-md p-6">
				<h1 className="text-4xl font-bold mb-6 text-center font-mono">
					Connexion
				</h1>

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
						<label htmlFor="password" className="mb-1 font-medium font-mono">
							Mot de passe :
						</label>
						<input
							type="password"
							id="password"
							name="password"
							required
							className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>
					</div>
					{error && <p className="text-red-600 mb-4 text-center">{error}</p>}

					<button
						type="submit"
						disabled={loading}
						className={`w-full py-2 rounded-3xl text-white font-semibold font-mono ${
							loading ? "bg-blue-300" : "bg-indigo-800 hover:bg-indigo-950"
						}`}
					>
						{loading ? "Connexion..." : "Se connecter"}
					</button>
				</form>

				<p className="mt-4 text-center text-gray-600">
					<Link
						to="/register"
						className="text-blue-500 hover:underline font-mono"
					>
						Vous n'avez pas encore de compte ? S'inscrire
					</Link>
				</p>
			</div>
		</div>
	);
}
