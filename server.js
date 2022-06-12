const http = require("http");
const PORT = process.env.PORT || 5000;
const { getUsers, getUserByUsername, addUser, removeUser } = require("./controllers/userController")
const { getRaces, getRaceByName, addRace } = require("./controllers/raceController");
const { getCats, getCatByName, addCat, removeCat } = require("./controllers/catController")
const { getBets, getBetByName, addBet } = require("./controllers/betController");
const server = http.createServer((req, res) => {
    if (req.url === '/api/users' && req.method === 'GET') {
        getUsers(req, res);
    }
    else if (req.url.match(/\/api\/users\/\w+/) && req.method === 'GET') {
        const username = req.url.split("/")[3];
        getUserByUsername(req, res, username);
    }
    else if (req.url === "/api/users/add" && req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            const result = JSON.parse(body);
            addUser(req, res, result.firstname, result.lastname, result.username, result.pass, result.cnp, result.phonenumber, result.adress, result.country, result.email)
        })
    } else if (req.url.match(/\/api\/users\/delete\/\w+/) && req.method === "DELETE") {
        const username = req.url.split("/")[4];
        removeUser(username);
    } else if (req.url === "/api/races" && req.method === "GET") {
        getRaces(req, res);
    } else if (req.url.match(/\/api\/races\/\w+/) && req.method === 'GET') {
        const name = req.url.split("/")[3];
        getRaceByName(req, res, name);
    } else if (req.url === "/api/races/add" && req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            const result = JSON.parse(body);
            addRace(req, res, result.id, result.name, result.opponent1, result.opponent2, result.date, result.status);
        })
    } else if (req.url === "/api/cats" && req.method === "GET") {
        getCats(req, res);
    }
    else if (req.url.match(/\/api\/cats\/\w+/) && req.method === 'GET') {
        const name = req.url.split("/")[3];
        getCatByName(req, res, name);
    }
    else if (req.url === "/api/cats/add" && req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            const result = JSON.parse(body);
            addCat(req, res, result.id, result.name, result.age, result.height, result.weight, result.rank)
        })
    }
    else if (req.url.match(/\/api\/cats\/delete\/\w+/) && req.method === "DELETE") {
        const name = req.url.split("/")[4];
        removeCat(name);
    } else if (req.url === "/api/bets" && req.method === "GET") {
        getBets(req, res);
    } else if (req.url.match(/\/api\/bets\/\w+/) && req.method === "GET") {
        const name = req.url.split("/")[3];
        getBetByName(req, res, name);
    } else if (req.url === "/api/bets/add" && req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            const result = JSON.parse(body);
            addBet(req, res, result.id, result.username, result.racename, result.date, result.winner, result.userbet, result.amount, result.result);
        })
    }
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
})
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));