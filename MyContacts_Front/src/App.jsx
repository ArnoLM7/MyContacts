import { Outlet, Link } from "react-router-dom";
import "./styles/App.css";

export default function App() {
	return (
		<div>
			<header>
				<h1>My contacts</h1>
				<nav>
					<Link to="/">Login</Link> | <Link to="/register">Register</Link> |{" "}
					<Link to="/contacts">Contacts</Link>
				</nav>
			</header>

			<main>
				<Outlet />
			</main>
		</div>
	);
}
