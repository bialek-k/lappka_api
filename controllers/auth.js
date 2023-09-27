const User = require("../models/user");

exports.login = async (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password

	const userData = await User.findOne({username:username, password:password}).then(user => console.log(user))
	console.log(userData);

	return res.status(200).send("good")

};
