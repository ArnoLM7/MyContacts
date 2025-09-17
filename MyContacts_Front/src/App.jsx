import { Outlet, Link } from "react-router-dom";
import "./styles/App.css";

export default function App() {
	return (
		<div>
			<main>
				<Outlet />
			</main>
		</div>
	);
}
