const User = require("../models/user");
const moment = require("moment");
const loginPage = (req, res) => {
    res.render("login");
};

const registerPage = (req, res) => {
    res.render("register");
};

const homePage = async (req, res) => {
    // const user = await User.findById({
    //     _id: req.cookie,
    // });
    // console.log(user.email);

    let say = "";
    const pagi = moment("08:00am", "hh:mma");
    const malam = moment("06:00pm", "hh:mma");
    let currentTime = moment();

    if (currentTime.isBefore(malam) && currentTime.isAfter(pagi)) {
        say = "Selamat siang";
    } else {
        say = "Selamat malam";
    }
    res.render("home", { say, currentTime });
};

module.exports = { loginPage, registerPage, homePage };
