const jwt = require("jsonwebtoken");

const createAuthorizationToken = (user) => jwt.sign({
    exp: Math.floor(Date.now() / 1000) + 7200, 
    data: { email: user.email, id: user._id }
}, process.env.JWT_SECRET);

module.exports = ({
    createAuthorizationToken
})