const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
	fullName: {
		type: String,
	},
	email: {
		type: String,
	},
	password: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

module.exports = mongoose.model("User", userSchema);
