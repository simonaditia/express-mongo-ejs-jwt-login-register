const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password,
    };

    if (data.email.length < 10 || data.email.length > 15) {
        res.send(
            "Sory repeat your email minimum 10 character and  maximum 15 character"
        );
        return false
    }

    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
        res.send("User already exists. Please choose a different user");
    } else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword;

        const userData = await User.insertMany(data);
        console.log(userData);
        res.redirect("/login");
    }
};
const loginUser = async (req, res) => {
    try {
        const check = await User.findOne({ email: req.body.email });
        if (!check) {
            res.send("email cannot found!");
            return false;
        }

        const isPasswordMatch = await bcrypt.compare(
            req.body.password,
            check.password
        );

        if (isPasswordMatch) {
            const user = { email: req.body.email };
            const token = jwt.sign(user, process.env.SECRET_KEY, {
                expiresIn: "1h",
            });
            res.cookie("jwt", token, { httpOnly: true });
            res.redirect("/home");
        } else {
            req.send("wrong password");
        }
    } catch (error) {
        res.send("wrong detail");
    }
};

const logoutUser = (req, res) => {
    res.clearCookie("jwt");
    res.redirect("/login");
};

module.exports = { registerUser, loginUser, logoutUser };
