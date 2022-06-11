let users = require("../database")

// function for finding all users

function findAllUsers() {
    users.createTables();
    return users.getAllUsers();
}
function findUserByUsername(username) {
    users.createTables();
    return users.getUserByUsername(username);
}
function insertUserInDb(firstname, lastname, username, password, cnp, phonenumber, adress, country, email) {
    users.createTables();
    return users.insertUser(firstname, lastname, username, password, cnp, phonenumber, adress, country, email);
}
function deleteUserFromDb(username) {
    users.createTables();
    return users.deleteUser(username)
}
module.exports = {
    findAllUsers, findUserByUsername, insertUserInDb, deleteUserFromDb
}