const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Brak tokena JWT' });
    }

    req.accessToken = token;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Nieprawidłowy token JWT' });
  }
};

module.exports = verifyToken;