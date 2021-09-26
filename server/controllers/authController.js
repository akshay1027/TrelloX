const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// User DB modal
const UserModal = require('../models/userModal.js');

dotenv.config();

// =========> Authenticate user & get token
const signInUser = async (req, res) => {

    // destructuring request
    const { email, password } = req.body;

    try {
        let user = await UserModal.findOne({ email });

        // check if user exists
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials. Try again?' });
        }

        const name = user.name;

        // Check for password match, String password === hashed password
        const isPasswordMatching = await bcrypt.compare(password, user.password);
        if (!isPasswordMatching) {
            return res.status(400).json({ errors: 'Invalid credentials' });
        }

        jwt.sign(
            {
                user: { id: user.id }
            },
            process.env.JWT_SECRET,
            { expiresIn: 3600000000 },
            (error, token) => {
                if (error) throw error;
                res.json({ token, name, id: user.id });
            }
        );

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// =========> Signup user and get token  
const signUpUser = async (req, res) => {

    console.log(req.body);
    const { email, password, name } = req.body;
    console.log(req.body);

    try {
        // check if User exists already
        let isUserExists = await UserModal.findOne({ email });

        if (isUserExists) {
            return res.status(400).json({ error: 'User with this Email ID Already Exists' })
        }

        const generateSalt = await bcrypt.genSalt(10);

        // const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
        const hashedPassword = bcrypt.hashSync(password, generateSalt);

        // Create newUser and save New User to DB
        const newUser = new UserModal({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        // Returb new generated token
        jwt.sign(
            {
                user: { id: newUser.id, },
            },
            process.env.JWT_SECRET,
            { expiresIn: 3600000000 },
            (error, token) => {
                if (error) throw error;
                res.json({ token, id: newUser.id });
            }
        );

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// =========> Get User Details after logging in
const getUserDetails = async (req, res) => {
    try {
        const user = await UserModal.findById(req.user.id).select('-password');
        return res.json(user);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal server error');
    }
}

module.exports = {
    signInUser,
    signUpUser,
    getUserDetails
};
