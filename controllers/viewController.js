const User = require("../models/user");
const moment = require("moment");
const momentTimeZone = require("moment-timezone");
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
    const userEmail = req.user ? req.user.email : "";
    const name = userEmail.split("");
    let userName = [];
    for (let i = 0; i < name.length; i++) {
        if (name[i] === "@") {
            break;
        }
        userName.push(name[i]);
    }
    finalUserName = userName.join("");

    let say = "";
    momentTimeZone.tz.setDefault("Asia/Jakarta");
    const pagi = momentTimeZone("08:00am", "hh:mma");
    const malam = momentTimeZone("06:00pm", "hh:mma");
    let currentTime = momentTimeZone();

    if (currentTime.isBefore(malam) && currentTime.isAfter(pagi)) {
        say = "Selamat siang waktu Jakarta";
    } else {
        say = "Selamat malam waktu Jakarta";
    }
    res.render("home", {
        say,
        currentTime,
        userEmail,
        finalUserName,
    });
};

module.exports = { loginPage, registerPage, homePage };
