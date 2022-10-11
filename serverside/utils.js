import jwt from 'jsonwebtoken';
import config from './config';
const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    'configJWT_SECRET',
    {
      expiresIn: '48h',
    }
  );
};

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  // console.log('mytokek:',token)
  if (token) {
    const onlyToken = token.slice(6, token.length);
    // console.log('onlyToken:' ,onlyToken)
    jwt.verify(onlyToken, 'configJWT_SECRET', (err, decode) => {
      if (err) {
        // console.log(err.message)
        return res.status(401).send({ message: 'Invalid Token' });
      }
      // console.log(decode)
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({ message: 'Token is not supplied.' });
  }
};

const isAdmin = (req, res, next) => {
  // console.log(req.user);
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ message: 'Admin Token is not valid.' });
};

export { getToken, isAuth, isAdmin };
