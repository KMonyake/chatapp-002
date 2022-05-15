const express = require("express");
const app = express();
const mongoose = require("mongoose");

// MongoDB
const dbURL = "mongodb+srv://Kutlwisiso:SsijLDDG6JhbpiR9@cluster0.77idw.mongodb.net/ChatApp?retryWrites=true&w=majority";
mongoose.connect(dbURL)
    .then(() => app.listen(3001, () => console.log("another server started on port 3001, connected to mongodb")))
    .catch(err => console.log(err))

// Models
const Message = require("../models/message");
const User = require("../models/user"); 


// Ensures that user exists
function checkforValidUser(validID){
    User.findById(validID)
        .then((results) => {
            return(results);
        })
        .catch(err => console.log(err))
}


// Ensures that a user does not exist
function checkforNullUser(invalidID){
    User.findOne(invalidID)
        .then((results) => {
            return(results);
        })
        .catch(err => console.log(err))
}


module.exports = { checkforValidUser, checkforNullUser };