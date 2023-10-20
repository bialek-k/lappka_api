const jwt = require('njwt')

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No JWT' });
    }
    
    jwt.verify(token, process.env.NODE_JWT_ACCESSTOKEN_KEY, (err, user) => {
      if(err) return res.status(403).json({ message: 'Wrong JWT' });

      req.user = user;
      next();
    });

  } catch (err) {
    return res.status(401).json({ message: 'Wrong JWT' });
  }
};

module.exports = authenticate;