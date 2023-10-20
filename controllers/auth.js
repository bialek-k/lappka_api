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
		const refreshToken = jwt.sign({id:existingUser._id}, process.env.NODE_JWT_REFRESHTOKEN_KEY, {expiresIn:525600}); 
		
    return res.status(200).send({accessToken, refreshToken});
		
	} catch (err){
		return res.status(400).send('Internal Server Error')
	}
	
};

exports.refreshToken = async (req,res, next) => {

	try {
		const refreshToken = req.body.refreshToken
		
		if(!refreshToken){
			return res.status(401);
		}
		
		const verifyToken = jwt.verify(refreshToken, process.env.NODE_JWT_REFRESHTOKEN_KEY);

		if(!verifyToken){
			return res.status(400);
		}

		const existUser = await User.findById(verifyToken.id).exec();

		const accessToken = jwt.sign({id:existUser._id}, process.env.NODE_JWT_ACCESSTOKEN_KEY, {expiresIn:86400}); 
		res.status(200).send({accessToken})
	
	} catch (error) {
		return res.status(400).send('Internal Server Error')
	}
}
