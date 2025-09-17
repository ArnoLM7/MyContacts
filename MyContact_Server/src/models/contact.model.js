const mongoose = require("mongoose");
const contactSchema = mongoose.Schema({
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	phone: {
		type: String,
	},
});

module.exports = mongoose.model("Contact", contactSchema);
