
const JWT = require("jsonwebtoken")

const secret = "mysecretkey"

function generateToken(user) {
  const payload = user
  console.log('Generating token for user:', payload);
  const token = JWT.sign(payload, secret);
  return token;
}


function verifyToken(token) {
  try {
    const payload = JWT.verify(token, secret);
    return payload
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

module.exports = {
    generateToken,
    verifyToken
}
