require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const cors = require("cors");
const logger = require("morgan");

const port = 3000;
const api = require("./routes/api");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.get("/", (req, res, next) => {
    try {
        return res.json({ status: 200, message: "OK" });
    } catch (error) {
        next(error);
    }
});
app.use("/api/v1", api);

app.use((err, req, res, next) => {
    res.status(500).json({ err: err.message });
});

app.use((req, res, next) => {
    res.status(404).json({ err: `Cannot ${req.method} ${req.url}` });
});

app.listen(port, () => {
    console.log(`running on port ${port}`);
});

module.exports = app;
