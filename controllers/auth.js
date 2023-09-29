const User = require("../models/user");

exports.login = async (req, res, next) => {

	try{
		const emailaddress = req.body.emailaddress;
		const password = req.body.password

		const existingUser = await User.findOne({emailaddress:emailaddress}).exec();

		if(!existingUser){
			return res.status(400).send("User doesn't exist");
		} 

		if(existingUser.password === password){
			return res.status(200).send(existingUser._id);
		} else{
			return res.status(400).send("Wrong password");
		}

	} catch (err){
		console.log(err)
	}


};
