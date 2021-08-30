import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticatedUser = (req, res, next) => {

    // get token from header
    const token = req.header('auth-token');

    // check if no token
    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // verify token
    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
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
        res.status(401).json({ msg: 'Token is invalid' });
    }
 
}