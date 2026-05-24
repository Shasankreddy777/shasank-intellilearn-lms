const db = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {

    try {

        const { name, email, password, role } = req.body;

        // Validation
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check existing user
        db.get(
            "SELECT * FROM users WHERE email = ?",
            [email],
            async (err, user) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }

                if (user) {
                    return res.status(400).json({
                        success: false,
                        message: "Email already exists"
                    });
                }

                // Hash password
                const hashedPassword = await bcrypt.hash(password, 10);

                // Insert user
                db.run(
                    `INSERT INTO users (name, email, password, role)
                     VALUES (?, ?, ?, ?)`,
                    [name, email, hashedPassword, role],
                    function (err) {

                        if (err) {
                            return res.status(500).json({
                                success: false,
                                message: err.message
                            });
                        }

                        res.status(201).json({
                            success: true,
                            message: "User registered successfully",
                            userId: this.lastID
                        });

                    }
                );

            }
        );

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Check user
        db.get(
            "SELECT * FROM users WHERE email = ?",
            [email],
            async (err, user) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }

                if (!user) {
                    return res.status(401).json({
                        success: false,
                        message: "Invalid credentials"
                    });
                }

                // Compare password
                const isMatch = await bcrypt.compare(
                    password,
                    user.password
                );

                if (!isMatch) {
                    return res.status(401).json({
                        success: false,
                        message: "Invalid credentials"
                    });
                }

                // Generate JWT token
                const token = jwt.sign(
                    {
                        id: user.id,
                        role: user.role
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "7d"
                    }
                );

                res.status(200).json({
                    success: true,
                    message: "Login successful",
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    }
                });

            }
        );

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    registerUser,
    loginUser
};