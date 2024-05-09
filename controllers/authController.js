const bcrypt = require("bcrypt");
const USER = require("../models/userSchema");

const signup = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const existingUser = await USER.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new USER({
            username,
            email,
            password: hashedPassword,
            role,
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await USER.findOne({ email });

        if (!user) {
            return res
                .status(401)
                .json({ message: "User does not exist!", ok: false });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res
                .status(401)
                .json({ message: "Enter the correct password", ok: false });
        }

        res
            .status(200)
            .json({
                id: user._id,
                username: user.username,
                message: "Login successful",
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { signup, login };
