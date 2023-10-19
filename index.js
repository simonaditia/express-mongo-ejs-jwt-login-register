require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 4001;
const userRoute = require("./routes/user");
const viewRoute = require("./routes/view");
const connectDB = require("./config/db");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.use(express.static("public"));

connectDB();

app.get("/ping", (req, res) => {
    res.json({ message: "pong!" });
});

app.use("/", viewRoute);
app.use("/api/v1/users", userRoute);

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
