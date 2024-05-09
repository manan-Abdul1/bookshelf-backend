const bcrypt = require('bcrypt');
const USER = require('../models/userSchema');

const signup = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const existingUser = await USER.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new USER({
            username,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = { signup };
