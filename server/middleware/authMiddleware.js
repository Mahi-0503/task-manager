const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization;
       console.log("AUTH HEADER =", authHeader);
    if (!authHeader) {
        return res.status(401).json({
            message: "Access Denied"
        });
    }

    const token = authHeader.split(" ")[1];

    console.log("TOKEN =", token);
    console.log("JWT_SECRET =", process.env.JWT_SECRET);

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (err) {
        console.log("JWT VERIFY ERROR =", err.message);
        return res.status(401).json({
            message: "Invalid Token"
        });

    }

};

module.exports = authMiddleware;