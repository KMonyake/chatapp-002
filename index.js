const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
// const path = require("path");

// dotenv
require("dotenv").config();

// Cors
app.use(cors());

// Helmet
const helmet = require("helmet");
app.use(helmet());

// MongoDB
const dbURL = process.env.MONGO_LOCAL_KEY;
mongoose.connect(dbURL)
    .then(() => app.listen(process.env.PORT || 3001, () => console.log(`server started on port ${process.env.PORT || 3001}, connected to mongodb`)))
    .catch(err => console.log(err))

// Models
const Message = require("./models/message"); 
const User = require("./models/user"); 

// Parse json data
app.use(express.json());

//=============================================================
// Test
//=============================================================
app.get("/test", (req, res) => {
    res.send("Sever is live and operational.");
})

//=============================================================
// Respond to POST (NEW USER SIGN UP)
//=============================================================
app.post("/signup", (req, res) => {
    const { username, email, password } = req.body;
    // Check if user already exits in db.
    User.findOne({ username, email })
        .then((result) => {
            if(result){
                res.json({ error: "A user with this username and email already exist, please sign in." })
            }
            // Else create a new user.
            else{
                User.create({
                    username,
                    email,
                    password
                })
                .then((results) => {
                    jwt.sign({ user: results }, "secret key", (err, token) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.json({ user: results, token });
                        }
                    })
                })
                .catch(() => console.log("There was an error registering a new user"))
            }
        })
})

//=============================================================
// Respond to already logged in user (AUTO SIGN IN IF BROWSER REFRESHES)
//=============================================================
app.post("/autosignin", (req, res) => {
    const { _id } = req.body;
    User.findOne({ _id })
    .then((results) => {
        // Check if user exists
        if(results.length !== 0){
            res.json(results);
        }
        else{
            res.json({error: "User does not exist. Try signing up."})
        }
    })
    .catch((err) => {
        console.log("There was an error signing in a user",err);
    })
})  

//=============================================================
// Respond to POST (NEW USER SIGN IN)
//=============================================================
app.post("/signin", (req, res) => {
    const { email, password } = req.body;
    // Check if this user exists
    User.findOne({ email, password })
        .then((results) => {
            if(results){
                jwt.sign({user: results}, "secret key",(err, token) => {
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.json({user: results, token});
                    }
                })
            }
            else{
                res.json({ error: "User does not exist." })
            }
        })
        .catch((err) => {
            console.log("There was an error signing in a user",err);
        })
})

//=============================================================
// Respond to GET (ALL USERS),which is actually a post request to ensure the userid is not mine
//=============================================================
app.post("/allusers", verifyToken, (req, res) => {
    jwt.verify(req.token, "secret key", (err, authData) => {
        if(err){
            console.log(err);
        }
        else{
            const { _id: userId } = authData.user;
            
            // Return only users that are not the current user or admin
            User.find({ $and: [{ _id: { $ne: userId } }, { _id: { $ne: "6280123d43f8438c91d3c5ca" }}]})
            .then((results) => res.json(results))
            .catch(()=>console.log("There was an error fetching users."))
        }
    })
})

//=============================================================
// Respond to GET (USER MESSAGES)
//=============================================================
app.post("/allmessages", (req, res) => {
    const { chatId } = req.body;
    Message.find({ chat_id: chatId })
        .then((results) => res.json(results))
        .catch(() => console.log("An error occured fetching messages."))
})

//=============================================================
// Respond to POST (NEW MESSAGE)
//=============================================================
app.post("/messages", (req, res) => {
    const { senderId, receiverId, chatId, text } = req.body;

    Message.create({
        sender_id: senderId,
        receiver_id: receiverId,
        chat_id: chatId,
        message: text
    })
    .then(() => console.log("New message added to databse."))
    .catch(() => console.log("An error occured sending a new message to the database."))
})

//=============================================================
// Fetch current user
//=============================================================
app.post("/profile", (req, res) => {
    const { _id } = req.body;
    User.findById(_id)
        .then((results) => {
            res.json(results);
        })
        .catch((err) => {
            console.log("There was an error fetching user data", err);
        })
}) 

//=============================================================
// Update user profile data
//=============================================================
app.put("/updateprofile", (req, res) => {
    const { _id, email, password, username } = req.body;
    User.findByIdAndUpdate({_id},{
        username,
        email,
        password
    })
    .then((results) => {
        res.json({error: "null"});
    })
    .catch((err) => {
        console.log("There was an error updating user data", err);
    })
}) 

//=============================================================
// Delete account
//=============================================================
app.delete("/deleteaccount", (req, res) => {
    const { _id } = req.body;
    User.findByIdAndDelete({_id})
    .then((results) => {
        res.json({error: "null"});
    })
    .catch((err) => {
        console.log("There was an error updating user data", err);
    })
}) 

//=============================================================
// Respond to POST (ADMIN SIGN IN)
//=============================================================
app.post("/admin", (req, res) => {
    const { email, password } = req.body;
    // Check if this user exists
    User.findOne({ email, password })
        .then((results) => {
            if (results) {
                jwt.sign({ user: results }, "secret key", (err, token) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.json({ user: results, token });
                    }
                })
            }
            else {
                res.json({ error: "User does not exist." })
            }
        })
        .catch((err) => {
            console.log("There was an error signing in a user", err);
        })
})

//=============================================================
// Verify Token
//=============================================================
function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    // Check if bearer is undefined
    if (bearerHeader) {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    }
    else {
        // Forbidden
        res.status(403);
    }
}

//=============================================================
// Deployment
//=============================================================
app.use(express.static("client/build"));

// Resources:
// Video title: Node.js API Authentication With JWT
// Video owner: Traversy Media
// Video URL: https://youtu.be/7nafaH9SddU