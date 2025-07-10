const {verifyToken}  = require('../services/auth')

function authMiddleware(cookieName) {
  return (req, res, next) => {
    const token = req.cookies[cookieName];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
   try{
     const payload = verifyToken(token);
     if (!payload) {
       return res.status(401).json({ error: 'Invalid token' });
     }
   } catch (error) {
     console.error('Token verification failed:', error);
     return res.status(401).json({ error: 'Invalid token' });
   }

    req.user = payload; // Attach user info to request
    next();
  };
}


module.exports = {authMiddleware};