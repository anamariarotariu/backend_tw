const db = require("mysql");
const pool = db.createPool({
    user: "root",
    host: "5.tcp.eu.ngrok.io",
    database: "tw",
    password: "password",
    port: 13384,
    timeout: 60 * 60 * 1000,
    ssl: true
})

// function for creating tables if they don't exist

let createTables = () => {

    pool.query(
        "CREATE TABLE IF NOT EXISTS users (firstname VARCHAR(50) NOT NULL,lastname VARCHAR(50) NOT NULL,username VARCHAR(50) NOT NULL,pass VARCHAR(50)NOT NULL,cnp int (13),phonenumber int(15),adress VARCHAR(50) NOT NULL, country VARCHAR(50) NOT NULL,email VARCHAR(50),PRIMARY KEY(username))"
    );
    pool.query(
        "CREATE TABLE IF NOT EXISTS bets (id INT(15) NOT NULL, username VARCHAR(50) NOT NULL, racename VARCHAR(50) NOT NULL, date DATE NOT NULL, winner VARCHAR(50) NOT NULL, userbet VARCHAR(50) NOT NULL, amount int(3) NOT NULL, result VARCHAR(50) NOT NULL,)"
    );
    pool.query(
        "CREATE TABLE IF NOT EXISTS races (id INT(15) NOT NULL, name VARCHAR(50) NOT NULL, opponent1 VARCHAR(50) NOT NULL, opponent2 VARCHAR(50) NOT NULL, date DATE NOT NULL, status VARCHAR(50) NOT NULL,)"
    );
    pool.query(
        "CREATE TABLE IF NOT EXISTS cats (id INT(15) NOT NULL, name VARCHAR(50) NOT NULL, age INT(2) NOT NULL,height INT(4) NOT NULL, weight INT(4) NOT NULL, rank INT(2) NOT NULL,)"
    );
};

// function for getting all the users

let getAllUsers = () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM users", (error, userList) => {
            if (error) {
                return reject(error);
            }
            return resolve(userList);
        });
    });
};
// function for getting all the cats

let getAllCats = () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM cats", (error, catList) => {
            if (error) {
                return reject(error);
            }
            return resolve(catList);
        });
    });
};
//function for getting all the bets

let getAllBets = () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM bets", (error, betList) => {
            if (error) {
                return reject(error);
            }
            return resolve(betList);
        });
    });
};

// function for getting all the races 

let getAllRaces = () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM races", (error, raceList) => {
            if (error) {
                return reject(error);
            }
            return resolve(raceList);
        });
    });
};

// function for retrieving one user by its username

let getUserByUsername = (username) => {
    const sqlQuery = "SELECT * FROM users WHERE username = ?";
    return new Promise((resolve, reject) => {
        pool.query(sqlQuery, [username], (error, userByUsername) => {
            if (error) {
                return reject(error);
            }
            return resolve(userByUsername);
        });
    });
};

// function for retrieving one cat by its name

let getCatByName = (name) => {
    const sqlQuery = "SELECT * FROM cats WHERE name = ?";
    return new Promise((resolve, reject) => {
        pool.query(sqlQuery, [name], (error, catByName) => {
            if (error) {
                return reject(error);
            }
            return resolve(catByName);
        });
    });
};

// function for retrieving one bet by its name

let getBetByName = (username) => {
    const sqlQuery = "SELECT * FROM bets WHERE username = ?";
    return new Promise((resolve, reject) => {
        pool.query(sqlQuery, [username], (error, betByName) => {
            if (error) {
                return reject(error);
            }
            return resolve(betByName);
        });
    });
};

// function for retrieving one race by its name

let getRaceByName = (status) => {
    const sqlQuery = "SELECT * FROM races WHERE status = ?";
    return new Promise((resolve, reject) => {
        pool.query(sqlQuery, [status], (error, raceByName) => {
            if (error) {
                return reject(error);
            }
            return resolve(raceByName);
        });
    });
};

// function for inserting a new user in db

let insertUser = (firstname, lastname, username, pass, cnp, phonenumber, adress, country, email) => {
    const sqlQuery = "INSERT INTO users (firstname, lastname, username, pass, cnp, phonenumber, adress, country, email) VALUES (?,?,?,?,?,?,?,?,?)";
    return new Promise((resolve, reject) => {
        pool.query(sqlQuery, [firstname, lastname, username, pass, cnp, phonenumber, adress, country, email], (error, newUser) => {
            if (error) {
                return reject(error);
            }
            return resolve(newUser);
        });
    });
};

// function for inserting a new cat in db

let insertCat = (id, name, age, height, weight, rank) => {
    const sqlQuery = "INSERT INTO cats (id, name, age, height, weight, rank) VALUES (?,?,?,?,?,?)";
    return new Promise((resolve, reject) => {
        pool.query(sqlQuery, [id, name, age, height, weight, rank], (error, newCat) => {
            if (error) {
                return reject(error);
            }
            return resolve(newCat);
        })
    })
}

// function for inserting a new bet in db

let insertBet = (id, username, racename, date, winner, userbet, amount, result) => {
    const sqlQuery = "INSERT INTO bets (id, username, racename, date, winner, userbet, amount, result) VALUES (?,?,?,?,?,?,?,?)";
    return new Promise((resolve, reject) => {
        pool.query(sqlQuery, [id, username, racename, date, winner, userbet, amount, result], (error, newBet) => {
            if (error) {
                return reject(error);
            }
            return resolve(newBet);
        })
    })
}

// function for inserting a new race in db

let insertRace = (id, name, opponent1, opponent2, date, status) => {
    const sqlQuery = "INSERT INTO races (id, name, opponent1, opponent2, date, status) VALUES (?,?,?,?,?,?)";
    return new Promise((resolve, reject) => {
        pool.query(sqlQuery, [id, name, opponent1, opponent2, date, status], (error, newRace) => {
            if (error) {
                return reject(error);
            }
            return resolve(newRace);
        })
    })
}

// function for deleting an user 

let deleteUser = (username) => {
    const sqlQuery = "DELETE FROM users WHERE username = ?";
    return new Promise((resolve, reject) => {
        pool.query(sqlQuery, [username], (error, deletedUser) => {
            if (error) {
                return reject(error);
            }
            console.log("Deleted user from db = " + deletedUser);
            return resolve(deletedUser);
        })
    })
}
// function for deleting a cat

let deleteCat = (name) => {
    const sqlQuery = "DELETE FROM cats WHERE name = ?";
    return new Promise((resolve, reject) => {
        pool.query(sqlQuery, [name], (error, deletedCat) => {
            if (error) {
                return reject(error);
            }
            return resolve(deletedCat);
        })
    })
}

module.exports = {
    createTables, getAllUsers, getAllCats, getAllBets, getAllRaces, getUserByUsername, getCatByName, getBetByName, getRaceByName, insertUser, insertCat, insertBet, insertRace, deleteUser, deleteCat
}