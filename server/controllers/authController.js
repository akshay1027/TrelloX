import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import dotenv from 'dotenv';

// User DB modal
import {UserModal} from '../models/userModal';

dotenv.config();

// =========> Authenticate user & get token
export const signInUser = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    // destructuring request
    const { email, password } = req.body;

    try {
        let user = await UserModal.findOne({email});

        // check if user exists
        if(!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials. Try again?' }] });
        }

        // Check for password match, String password === hashed password
        const isPasswordMatching = await bcrypt.compare(password, user.password);
        if (!isPasswordMatching) {
            return res.status(400).json({
            errors: [{ msg: 'Invalid credentials' }],
            });
        }

        jwt.sign(
            {
                user: {id: user.id}
            },
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (error, token) => {
                if(error) throw error;
                res.json({token});
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
}

// =========> Signup user and get token  
export const signUpUser = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, userName} = req.body;

    try {
        // check if User exists already
        let isUserExists =  await UserModal.findOne({ email });

        if(!isUserExists) {
            return res.status(400).json({ errors: [{ msg: 'User wirh this Email ID Already Exists'}]})
        }

        const generateSalt =  await bcrypt.genSalt(10);
        
        // const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
        const hashedPassword = bcrypt.hashSync(password, generateSalt);

        // Create newUser and save New User to DB
        const newUser = new UserModal({
            userName,
            email,
            password: hashedPassword
        });

        await newUser.save();

        // Returb new generated token
        jwt.sign(
            {
              user: {id: user.id,},
            },
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (error, token) => {
              if (error) throw error;
              res.json({ token });
            }
          );
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
}

// =========> Get User Details after logging in
export const getUserDetails = async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Internal server error');
    }
}