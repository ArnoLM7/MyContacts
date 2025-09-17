require("dotenv").config();
require("./src/database/db");

// Importation des routes "auth"
const auth = require("./src/routes/auth.routes");
const contact = require("./src/routes/contact.routes");
const express = require("express");
const app = express();

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Utilisation des routes "auth"
app.use("/api/auth", auth);
app.use("/api/contact", contact);

// Cors pour autoriser les requêtes depuis le frontend
const cors = require("cors");
app.use(cors());

// Documentation Swagger
const swaggerUI = require("swagger-ui-express");

app.use(express.json());

const fs = require("fs");
const path = require("path");

// Charger base.json
const baseSpec = JSON.parse(
	fs.readFileSync(path.join(__dirname, "docs/base.json"))
);

// Charger les JSON des autres routes
const loginSpec = JSON.parse(
	fs.readFileSync(path.join(__dirname, "docs/login.json"))
);

const registerSpec = JSON.parse(
	fs.readFileSync(path.join(__dirname, "docs/register.json"))
);

const contactSpec = JSON.parse(
	fs.readFileSync(path.join(__dirname, "docs/contact.json"))
);

const userSpec = JSON.parse(
	fs.readFileSync(path.join(__dirname, "docs/user.json"))
);

// Fusionner les "paths"
baseSpec.paths = {
	...baseSpec.paths,
	...loginSpec,
	...registerSpec,
	...userSpec,
	...contactSpec,
};

// Brancher Swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(baseSpec));

// Port d'écoute
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
