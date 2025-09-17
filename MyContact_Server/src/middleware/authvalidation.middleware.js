const validator = require("../utils/validate");
const registerValidation = async (req, res, next) => {
	const validateRule = {
		fullName: "required|string|min:3",
		email: "required|email",
		password: "required|min:8",
	};

	validator(req.body, validateRule, {}, (err, status) => {
		if (!status) {
			res.status(412).send({
				success: false,
				message: "Register validation failed",
				data: err,
			});
		} else {
			next();
		}
	});
};

const loginValidation = async (req, res, next) => {
	const validateRule = {
		email: "required|email",
		password: "required|min:8",
	};

	validator(req.body, validateRule, {}, (err, status) => {
		if (!status) {
			res.status(412).send({
				success: false,
				message: "Login validation failed",
				data: err,
			});
		} else {
			next();
		}
	});
};

module.exports = {
	registerValidation,
	loginValidation,
};
