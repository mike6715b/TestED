const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// const Post = require("./models/post");

const app = express();

const authRoutes = require("./routes/auth");

mongoose.connect(
        'mongodb://localhost:27017/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true
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

module.exports = app;