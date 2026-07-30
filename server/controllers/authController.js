const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
    createUser,
    findUserByEmail,
} = require("../models/userModel");

exports.signup = async (req, res) => {
    try {

        const { name, email, password, role } = req.body;

        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await createUser(
            name,
            email,
            hashedPassword,
            role || "Member"
        );

        res.status(201).json({
            message: "User Registered",
            user,
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error",
        });

    }
};
exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login Successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });

    }
};