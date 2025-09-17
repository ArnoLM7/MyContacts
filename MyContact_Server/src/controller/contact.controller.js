const express = require("express");
const contactModel = require("../models/contact.model");

const createContact = async (req, res) => {
	try {
		const { firstName, lastName, phone } = req.body;

		const contact = new contactModel({
			firstName,
			lastName,
			phone,
			user: req.userData.id,
		});

		const saved = await contact.save();

		return res.status(201).json({
			message: "Contact créé!",
			result: saved,
			success: true,
		});
	} catch (error) {
		return res.status(500).json({
			error: error.message,
			success: false,
		});
	}
};

const getContacts = async (req, res) => {
	try {
		const contacts = await contactModel.find({ user: req.userData.id });
		return res.status(200).json({
			contacts: contacts,
			success: true,
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			success: false,
		});
	}
};

const updateContact = async (req, res) => {
	try {
		const { firstName, lastName, phone } = req.body;
		const contactId = req.params.id;

		const updatedContact = await contactModel.findByIdAndUpdate(
			{ _id: contactId, user: req.userData.id },
			{
				firstName,
				lastName,
				phone,
			},
			{ new: true }
		);

		if (!updatedContact) {
			return res.status(404).json({
				message: "Contact non trouvé",
				success: false,
			});
		}

		return res.status(200).json({
			message: "Contact mis à jour avec succès!",
			result: updatedContact,
			success: true,
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			success: false,
		});
	}
};

const deleteContact = async (req, res) => {
	try {
		const contactId = req.params.id;

		const deletedContact = await contactModel.findByIdAndDelete({
			_id: contactId,
			user: req.userData.id,
		});

		if (!deletedContact) {
			return res.status(404).json({
				message: "Contact non trouvé",
				success: false,
			});
		}
		return res.status(200).json({
			message: "Contact supprimé avec succès!",
			result: deletedContact,
			success: true,
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			success: false,
		});
	}
};

module.exports = {
	createContact,
	getContacts,
	updateContact,
	deleteContact,
};
