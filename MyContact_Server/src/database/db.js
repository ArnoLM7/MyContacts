// Connexion à la base de données MongoDB
const express = require("express");
const app = express();
require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL).then(() => {
	console.log(`Connected to MongoDB`);
});

module.exports = mongoose;
