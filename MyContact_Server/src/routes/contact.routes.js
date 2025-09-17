const express = require("express");
const router = express.Router();

const {
	contactValidation,
} = require("../middleware/contactvalidation.middleware");

const {
	createContact,
	getContacts,
	updateContact,
	deleteContact,
} = require("../controller/contact.controller");

const verifyToken = require("../middleware/auth.middleware");

// Route pour récupérer tous les contacts
router.get("/all", verifyToken, getContacts);

// Route pour créer un contact avec la validation du contact
router.post("/create", verifyToken, contactValidation, createContact);

// Route pour mettre à jour un contact avec la validation du contact
router.patch("/update/:id", verifyToken, contactValidation, updateContact);

// Route pour supprimer un contact
router.delete("/delete/:id", verifyToken, deleteContact);

module.exports = router;
