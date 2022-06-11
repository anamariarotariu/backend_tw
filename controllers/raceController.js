const Race = require("../models/raceModel");
// @desc Gets All Races
// @route GET /api/races
async function getRaces(req, res) {
    try {
        const races = await Race.findAllRaces();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(races));
    } catch (error) {
        console.log(error)
    }
}

// @desc Gets a single race by its name
// @route GET /api/races/:username

async function getRaceByName(req, res, name) {
    try {
        const race = await Race.findRaceByName(name);
        if (!race) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Race not found" }));
        } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(race));
        }
    } catch (error) {
        console.log(error)
    }
}
// @desc Add a new race in database
// @route POST /api/races/add

async function addRace(req, res, id, name, opponent1, opponent2, date, status) {
    try {
        newRace = await Race.insertRaceInDb(req, res, id, name, opponent1, opponent2, date, status);
        if (!newRace) {
            res.writeHead(409, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Race was not added in db" }));
        }
        else {
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(newRace));
        }

    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    getRaces, getRaceByName, addRace
}