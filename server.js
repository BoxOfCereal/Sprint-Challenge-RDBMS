const express = require("express");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
	res.send(`please use the API routes '/api/endpoint' `);
});

const projectsRoutes = require("./routes/projects");
server.use("/api/projects", projectsRoutes);

const actionsRoutes = require("./routes/actions");
server.use("/api/actions", actionsRoutes);


module.exports = server;
