const express = require("express");
const contactModel = require("../models/contact.model");

const createContact = async (req, res) => {
	try {
		const { firstName, lastName, phone } = req.body;

		const contact = new contactModel({
			firstName,
			lastName,
			phone,
		});

		const saved = await contact.save();

		return res.status(201).json({
			message: "Contact successfully created!",
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
		const contacts = await contactModel.find();
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
			contactId,
			{
				firstName,
				lastName,
				phone,
			},
			{ new: true }
		);

		if (!updatedContact) {
			return res.status(404).json({
				message: "Contact not found",
				success: false,
			});
		}

		return res.status(200).json({
			message: "Contact successfully updated!",
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

		const deletedContact = await contactModel.findByIdAndDelete(contactId);

		if (!deletedContact) {
			return res.status(404).json({
				message: "Contact not found",
				success: false,
			});
		}
		return res.status(200).json({
			message: "Contact successfully deleted!",
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
