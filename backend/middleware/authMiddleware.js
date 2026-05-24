const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        // Check token exists
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided"
            });
        }

        // Extract token
        const token = authHeader.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Store user info in request
        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });

    }

};

const authorizeRoles = (...roles) => {

    return (req, res, next) => {

        // Check role
        if (!roles.includes(req.user.role)) {

            return res.status(403).json({
                success: false,
                message: "Access denied. Unauthorized role"
            });

        }

        next();

    };

};

module.exports = {
    verifyToken,
    authorizeRoles
};