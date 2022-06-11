// control what the route is doing, interacts with the model 
const User = require("../models/userModel");
// @desc Gets All Users
// @route GET /api/users
async function getUsers(req, res) {
    try {
        const users = await User.findAllUsers();

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(users));
    } catch (error) {
        console.log(error)
    }
}
// @desc Gets a single user by its username
// @route GET /api/users/:username
async function getUserByUsername(req, res, username) {
    try {
        const user = await User.findUserByUsername(username);
        if (!user) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "User not found" }));
        } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(user));
        }
    } catch (error) {
        console.log(error)
    }
}
// @desc Add a new user in database
// @route POST /api/users/add
async function addUser(req, res, firstname, lastname, username, password, cnp, phonenumber, adress, country, email) {
    try {
        newUser = await User.insertUserInDb(firstname, lastname, username, password, cnp, phonenumber, adress, country, email);
        if (!newUser) {
            res.writeHead(409, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "User was not added in db" }));
        }
        else {
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(newUser));
        }

    } catch (error) {
        console.log(error)
    }
}

// @desc Delete user from database
// @route DELETE /api/users/delete/:username

async function removeUser(req, res, username) {
    try {
        deletedUser = await User.deleteUserFromDb(username);
        if (!deletedUser) {
            res.writeHead(409, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "User was not removed from db" }));

        } else {
            res.writeHead(204, { "Content-Type": "application/json" });
            res.end(JSON.stringify(deletedUser));
        }
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getUsers, getUserByUsername, addUser, removeUser
}