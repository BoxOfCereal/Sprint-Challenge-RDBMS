const express = require("express");
const router = express.Router();
const db = require("../data/helpers/actionsHelpers.js");

router.get("/", (req, res) => {
	db.getAll()
		.then(actions => res.status(200).json(actions))
		.catch(error =>
			res
				.status(500)
				.json({ error: "The actions could not be retrieved." })
		);
});

router.get("/:id", (req, res) => {
	const { id } = req.params;
	db.getById(id)
		.then(action => res.status(200).json(action))
		.catch(error =>
			res
				.status(500)
				.json({ error: "The action could not be retrieved." })
		);
});

router.post("/", (req, res) => {
	const newAction = req.body;
	db.add(newAction)
		.then(id => {
			db.getById(id).then(action => res.status(201).json(action));
		})
		.catch(error =>
			res.status(500).json({ error: "The action could not be created." })
		);
});

module.exports = router;
