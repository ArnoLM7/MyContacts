import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Contacts() {
	const APIURL = import.meta.env.VITE_API_URL;
	const token = localStorage.getItem("token");
	const navigate = useNavigate();

	const [contacts, setContacts] = useState([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const [showAddModal, setShowAddModal] = useState(false);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phone, setPhone] = useState("");

	const [showEditModal, setShowEditModal] = useState(false);
	const [editingContact, setEditingContact] = useState(null);

	const handleLogout = () => {
		localStorage.removeItem("token"); // supprime le token
		navigate("/"); // retourne à la page login
	};

	useEffect(() => {
		if (!token || token === "undefined") {
			navigate("/");
		} else {
			fetchContacts();
		}
	}, [APIURL]);

	const fetchContacts = async () => {
		setLoading(true);
		setError("");
		try {
			const res = await fetch(`${APIURL}/contact/all`, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.message || "Erreur de récupération");
			setContacts(data.contacts || []);
		} catch (err) {
			setError("Impossible de charger les contacts : " + err.message);
		} finally {
			setLoading(false);
		}
	};

	const addContact = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			const res = await fetch(`${APIURL}/contact/create`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ firstName, lastName, phone }),
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.message || "Erreur création contact");
			setContacts([...contacts, data.result]);
			setFirstName("");
			setLastName("");
			setPhone("");
			setShowAddModal(false);
		} catch (err) {
			setError("Impossible d'ajouter le contact: " + err.message);
		} finally {
			setLoading(false);
		}
	};

	const openEditModal = (contact) => {
		setEditingContact(contact);
		setFirstName(contact.firstName);
		setLastName(contact.lastName);
		setPhone(contact.phone);
		setShowEditModal(true);
	};

	const updateContact = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			const res = await fetch(
				`${APIURL}/contact/update/${editingContact._id}`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ firstName, lastName, phone }),
				}
			);
			const data = await res.json();
			if (!res.ok) throw new Error(data.message || "Erreur modification");
			setContacts(
				contacts.map((contact) =>
					contact._id === editingContact._id ? data.result : contact
				)
			);
			setShowEditModal(false);
			setEditingContact(null);
			setFirstName("");
			setLastName("");
			setPhone("");
		} catch (err) {
			setError("Impossible de modifier le contact: " + err.message);
		} finally {
			setLoading(false);
		}
	};

	const deleteContact = async (id) => {
		setError("");
		try {
			const res = await fetch(`${APIURL}/contact/delete/${id}`, {
				method: "DELETE",
				headers: { Authorization: `Bearer ${token}` },
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.message || "Erreur suppression");
			setContacts(contacts.filter((contact) => contact._id !== id));
		} catch (err) {
			setError("Erreur suppression : " + err.message);
		}
	};

	return (
		<div className="p-6 max-w-4xl mx-auto">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-3xl font-bold font-mono">Mes contacts</h1>
				<button
					onClick={handleLogout}
					className="px-4 py-2 text-red-800 rounded-3xl border font-mono border-red-800 hover:bg-red-800 hover:text-white transition duration-300"
				>
					Se déconnecter
				</button>
			</div>
			<button
				className="bg-indigo-800 text-white font-mono px-4 py-2 rounded-3xl hover:bg-indigo-950 mb-4"
				onClick={() => setShowAddModal(true)}
			>
				Ajouter un contact
			</button>

			{error && <p className="text-red-800 mb-4">{error}</p>}

			{showAddModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
					<div className="bg-white rounded-lg p-6 w-96">
						<h2 className="text-xl font-semibold font-mono mb-4">
							Ajouter un contact
						</h2>
						<form onSubmit={addContact} className="flex flex-col gap-3">
							<input
								type="text"
								placeholder="Prénom"
								className="border px-3 py-2 rounded font-mono"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								required
							/>
							<input
								type="text"
								placeholder="Nom"
								className="border px-3 py-2 rounded font-mono"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								required
							/>
							<input
								type="tel"
								placeholder="Téléphone"
								className="border px-3 py-2 rounded font-mono"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								required
							/>
							<div className="flex justify-end gap-2 mt-2">
								<button
									type="button"
									className="px-4 py-2 bg-gray-300 font-mono rounded-3xl hover:bg-gray-400"
									onClick={() => setShowAddModal(false)}
								>
									Annuler
								</button>
								<button
									type="submit"
									className="px-4 py-2 bg-indigo-800 font-mono text-white rounded-3xl hover:bg-indigo-950"
								>
									Ajouter
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{showEditModal && editingContact && (
				<div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
					<div className="bg-white rounded-lg p-6 w-96">
						<h2 className="text-xl font-semibold font-mono mb-4">
							Modifier le contact
						</h2>
						<form onSubmit={updateContact} className="flex flex-col gap-3">
							<input
								type="text"
								placeholder="Prénom"
								className="border px-3 py-2 rounded font-mono"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								required
							/>
							<input
								type="text"
								placeholder="Nom"
								className="border px-3 py-2 rounded font-mono"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								required
							/>
							<input
								type="tel"
								placeholder="Téléphone"
								className="border px-3 py-2 rounded font-mono"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								required
							/>
							<div className="flex justify-end gap-2 mt-2">
								<button
									type="button"
									className="px-4 py-2 bg-gray-300 rounded-3xl font-mono hover:bg-gray-400"
									onClick={() => setShowEditModal(false)}
								>
									Annuler
								</button>
								<button
									type="submit"
									className="px-4 py-2 bg-yellow-800 text-white font-mono rounded-3xl hover:bg-yellow-950"
								>
									Modifier
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* Liste de tous les contacts */}
			<div className="grid gap-4 mt-6 font-mono">
				{loading && <p>Chargement...</p>}
				{!loading && contacts.length === 0 && (
					<p className="font-mono">Aucun contact pour le moment.</p>
				)}
				{contacts.map((contact) => (
					<div
						key={contact._id}
						className="border p-4 rounded-lg flex justify-between items-center"
					>
						<div>
							<p className="font-semibold">
								{contact.firstName} {contact.lastName}
							</p>
							<p className="text-gray-950">{contact.phone}</p>
						</div>
						<div className="flex gap-2">
							<button
								className="px-4 py-1 bg-yellow-400 rounded-3xl font-mono hover:bg-yellow-800 text-white"
								onClick={() => openEditModal(contact)}
							>
								Modifier
							</button>
							<button
								className="px-4 py-1 bg-red-800 rounded-3xl font-mono hover:bg-red-950 text-white"
								onClick={() => deleteContact(contact._id)}
							>
								Supprimer
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
