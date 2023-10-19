const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.redirect("/login");
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.redirect("/login");
        }
        req.user = user;
        next();
    });
};

const checkIfLoggedIn = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        res.redirect("/home");
    }
    next();
};

module.exports = { authenticateToken, checkIfLoggedIn };
