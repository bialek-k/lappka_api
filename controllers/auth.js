const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {

	try {
		const { email, password } = req.body;
		const existingUser = await User.findOne({email:email}).exec();
	
		if(!existingUser){
			return res.status(400).send("User doesn't exist");
		} 

		const hashedPassword = bcrypt.compareSync(password, existingUser.password); 
    if(!hashedPassword){
      return res.status(400).send('Wrong password');
    }

		const accessToken = jwt.sign({id:existingUser._id}, process.env.NODE_JWT_ACCESSTOKEN_KEY, {expiresIn:86400}); 
		const refreshToken = jwt.sign({id:existingUser._id}, process.env.NODE_JWT_REFRESHTOKEN_KEY, {expiresIn:56200}); 

    return res.status(200).send({accessToken, refreshToken});

	} catch (err){
		return res.status(400).send('Internal Server Error')
	}

};
