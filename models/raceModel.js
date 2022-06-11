let races = require("../database");

// function for finding all races

function findAllRaces() {
    races.createTables();
    return races.getAllRaces();
}
function findRaceByName(username) {
    races.createTables();
    return races.getRaceByName(username);
}
function insertRaceInDb(id, name, opponent1, opponent2, date, status) {
    races.createTables();
    return races.insertRace(id, name, opponent1, opponent2, date, status);
}
module.exports = {
    findAllRaces, findRaceByName, insertRaceInDb
}