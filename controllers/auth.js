const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('njwt')

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

		// Generate AccessToken
		const claims = {iss: 'lappka-api', sub:"api-is-dead-make-it-yourself"};
  	const token = jwt.create(claims, process.env.NODE_JWT_KEY);
  	token.setExpiration(new Date().getTime() + 60*6000);
		const accessToken = token.compact();

    return res.status(200).send(accessToken);

	} catch (err){
		return res(400).send('Internal Server Error')
	}


};
