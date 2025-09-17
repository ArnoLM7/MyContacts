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
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Contact", contactSchema);
