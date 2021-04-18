const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// const Post = require("./models/post");

const app = express();

const authRoutes = require("./routes/auth");

mongoose.connect(
        process.env.MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
    .then(() => {
        console.log("Connected to database!");
    })
    .catch(() => {
        console.log("Connection failed!");
    });

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

//Headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.use("/api/auth", authRoutes);

app.get('*', function(req, res) {
    res.status(404).json({
        message: "Not found!"
    });
});

module.exports = app;