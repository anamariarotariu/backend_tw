const Cat = require("../models/catModel");
// @desc Gets All Cats
// @route GET /api/cats
async function getCats(req, res) {
    try {
        const cats = await Cat.findAllCats();

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(cats));
    } catch (error) {
        console.log(error)
    }
}
// @desc Gets a single cat by its name
// @route GET /api/cats/:name
async function getCatByName(req, res, name) {
    try {
        const cat = await Cat.findCatByName(name);
        if (!cat) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Cat not found" }));
        } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(cat));
        }
    } catch (error) {
        console.log(error)
    }
}
// @desc Add a new cat in database
// @route POST /api/cats/add
async function addCat(req, res, id, name, age, height, weight, rank) {
    try {
        newCat = await Cat.insertCatInDb(id, name, age, height, weight, rank);
        if (!newCat) {
            res.writeHead(409, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Cat was not added in db" }));
        }
        else {
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(newCat));
        }

    } catch (error) {
        console.log(error)
    }
}
// @desc Delete cat from database
// @route DELETE /api/cats/delete/:name

async function removeCat(req, res, name) {
    try {
        deletedCat = await Cat.deleteCatFromDb(name);
        if (!deletedCat) {
            res.writeHead(409, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Cat was not removed from db" }));

        } else {
            res.writeHead(204, { "Content-Type": "application/json" });
            res.end(JSON.stringify(deletedCat));
        }
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getCats, getCatByName, addCat, removeCat
}