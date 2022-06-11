const cats = require("../database");

// function for finding all cats

function findAllCats() {
    cats.createTables();
    return cats.getAllCats();
}
function findCatByName(name) {
    cats.createTables();
    return cats.getCatByName(name);
}
function insertCatInDb(id, name, age, height, weight, rank) {
    cats.createTables();
    return cats.insertCat(id, name, age, height, weight, rank);
}
function deleteCatFromDb(name) {
    cats.createTables();
    return cats.deleteCat(name)
}
module.exports = {
    findAllCats, findCatByName, insertCatInDb, deleteCatFromDb
}