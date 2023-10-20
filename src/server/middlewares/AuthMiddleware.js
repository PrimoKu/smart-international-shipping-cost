const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require('../models/User');

const validateToken = asyncHandler (async (req, res, next) => {

    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: "User is not authorized" });;
            } else {
                req.user = decoded.user;
                next();
            }
        });

        if (!token) {
            res.status(401).json({ message: "User is not authorized or token is missing" });;
        }
    } else {
        res.status(401).json({ message: "User is not authorized or token is missing" });
    }
});

const checkUser = (req, res, next) => {
    const token = req.signedCookies.jwt;
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                let user = await User.findOne({ email: decoded.user.email });
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
}

const requireAuth = (req, res, next) => {
    const token = req.signedCookies.jwt;
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                console.log(err.message);
                res.status(401).json({ error: 'Unauthorized' });
            } else {
                let user = await User.findOne({ email: decoded.user.email });
                req.user = user;
                next();
            }
        });
    } else {
        // res.status(401).json({ error: 'Unauthorized' });
    }
}

module.exports = {
    validateToken,
    checkUser,
    requireAuth,
};