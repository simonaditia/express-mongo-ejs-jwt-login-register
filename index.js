require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const port = process.env.PORT || 4001;
const userRoute = require("./routes/user");
const viewRoute = require("./routes/view");
const connectDB = require("./config/db");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const corsOptions = {
    origin: process.env.ALLOWED_CLIENTS.split(","),
};
app.use(cors(corsOptions));

app.use(express.static(__dirname + "/public/"));
app.use(express.json());

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

connectDB();

app.get("/ping", (req, res) => {
    res.json({ message: "pong!" });
});

app.use("/", viewRoute);
app.use("/api/v1/users", userRoute);

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
