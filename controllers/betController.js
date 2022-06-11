const Bet = require("../models/betModel");
// @desc Gets All Bets
// @route GET /api/bets
async function getBets(req, res) {
    try {
        const bets = await Bet.findAllBets();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(bets));
    } catch (error) {
        console.log(error)
    }
}
// @desc Gets a single bet by its name
// @route GET /api/bets/:name
async function getBetByName(req, res, name) {
    try {
        const bet = await Bet.findBetByName(name);
        if (!bet) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Bet not found" }));
        } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(bet));
        }
    } catch (error) {
        console.log(error)
    }
}
// @desc Add a new bet in database
// @route POST /api/bets/add
async function addBet(req, res, id, username, racename, date, winner, userbet, amount, result) {
    try {
        newBet = await Bet.insertBetInDb(req, res, id, username, racename, date, winner, userbet, amount, result);
        if (!newBet) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Bet was not added in db" }));
        }
        else {
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(newBet));
        }

    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    getBets, getBetByName, addBet
}