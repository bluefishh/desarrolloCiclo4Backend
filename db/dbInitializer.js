let mongoose = require("mongoose");
let appConfig = require("../config");

let connectionPromise = mongoose.connect(appConfig.fullUrl);

connectionPromise
    .then(function (result) {
        console.log("Connected to MongoDB...");
        console.log(result);
    })
    .catch(function (err) {
        console.log("Error connecting to MongoDB...");
        console.log(err);
    });