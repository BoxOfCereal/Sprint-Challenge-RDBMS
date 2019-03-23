const express = require("express");
const router = express.Router();
const db = require("../data/helpers/projectsHelpers.js");

router.get("/", (req, res) => {
	db.getAll()
		.then(projects => res.status(200).json(projects))
		.catch(error =>
			res.status(500).json({ error: "The projects could not be retrieved." })
		);
});

router.get("/:id", (req, res) => {
	const { id } = req.params;
	db.getById(id)
		.then(project => res.status(200).json(project))
		.catch(error =>
			res.status(500).json({ error: "The project could not be retrieved." })
		);
});

module.exports = router;