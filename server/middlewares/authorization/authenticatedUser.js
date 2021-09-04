const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authenticatedUser = (req, res, next) => {

    // get token from header
    const token = req.header('auth-token');
    // console.log('hii from middleware');

    // check if no token
    if(!token) {
        // console.log('no token');
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // verify token
    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        // console.log('is jwt verification async task? ');
        /*
            Eg: 
            decodeToken = {
                user: { id: '612d21def691253d7c17258f' },
                iat: 1630360790,
                exp: 1630720790
            }
            decodeToken.user = { id: '612d21def691253d7c17258f' }
        */
        req.user = decodeToken.user;
        next();
    } catch (error) {
        console.log('error =', error);
        res.status(401).json({ msg: 'Token is invalid' });
    }
}

module.exports = {
    authenticatedUser
};