const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

require('dotenv').config();
const userRoutes = require("./routes/user-controller");


const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200,
    credentials: true
}

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
app.use(cookieParser());

//Enabling cors
app.use(cors(corsOptions));

//Headers
app.use((req, res, next) => {
    // res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    res.setHeader(
        "Access-Control-Allow-Credentials",
        "true"
    )
    next();
});

app.use("/api/user", userRoutes);

app.get('*', function(req, res) {
    res.status(404).json({
        message: "Not found!"
    });
});

module.exports = app;