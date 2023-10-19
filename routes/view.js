const express = require("express");
const viewController = require("../controllers/viewController");
const router = express.Router();
const authUser = require("../middlewares/auth");

router.get("/login", authUser.checkIfLoggedIn, viewController.loginPage);
router.get("/register", authUser.checkIfLoggedIn, viewController.registerPage);
router.get("/home", authUser.authenticateToken, viewController.homePage);
router.get("/", authUser.authenticateToken, viewController.homePage);

module.exports = router;
