import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Login() {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const APIURL = import.meta.env.VITE_API_URL;

	useEffect(() => {
		console.log("API URL:", APIURL);
	}, [APIURL]);

	return (
		<div>
			<h1>Connexion</h1>
			<div>
				<label>Email:</label>
				<input
					className="form-control"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label>Mot de passe:</label>
				<input
					className="form-control"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">Se connecter</button>
			</div>
			<Link to="/register">
				<p>
					<strong>Vous n'avez pas encore de compte ?</strong> S'inscrire
				</p>
			</Link>
		</div>
	);
}
