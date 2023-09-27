const User = require('../models/user')

exports.login = (req,res,next) => {
  const username = req.body.username; 
  const password = req.body.password

  User.findOne({username: username, password: password}, (err, user) => {
    if(err){
      console.log(err);
      return res.status(500).send();
    }

    if(!user){
      return res.status(404).send();
    }

    return res.status(200).send()
  })

}