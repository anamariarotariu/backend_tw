const bets = require("../database")

// function for finding all bets

function findAllBets() {
    bets.createTables();
    return bets.getAllBets();
}
function findBetByName(name) {
    bets.createTables();
    return bets.getBetByName(name);
}
function insertBetInDb(id, username, racename, date, winner, userbet, amount, result) {
    bets.createTables();
    return bets.insertBet(id, username, racename, date, winner, userbet, amount, result);
}

module.exports = { findAllBets, findBetByName, insertBetInDb }