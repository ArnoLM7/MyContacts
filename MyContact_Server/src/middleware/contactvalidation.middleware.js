const validator = require("../utils/validate");
const contactValidation = async (req, res, next) => {
	const validateRule = {
		firstName: "required|string|min:2",
		lastName: "required|string|min:2",
		phone: "required|string|min:10|max:20",
	};

	validator(req.body, validateRule, {}, (err, status) => {
		if (!status) {
			res.status(412).send({
				success: false,
				message: "Les champs ne sont pas correctement remplis",
				data: err,
			});
		} else {
			next();
		}
	});
};

module.exports = {
	contactValidation,
};
