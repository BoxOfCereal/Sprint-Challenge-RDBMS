const express = require("express");
const router = express.Router();
const db = require("../data/helpers/actionsHelpers.js");
const contextDb = require("../data/helpers/contextsHelpers.js");

router.get("/", (req, res) => {
	//if there's a context selection
	if (req.query.contexts) {
		const contexts = JSON.parse(req.query.contexts);
		console.log(contexts);
		db.getActionsByContext(contexts)
			.then(actions => res.status(200).json(actions))
			.catch(error => res.status(500).json({ error: error }));
	} else {
		db.getAll()
			.then(actions => res.status(200).json(actions))
			.catch(error =>
				res.status(500).json({ error: "The actions could not be retrieved." })
			);
	}
});

router.get("/:id", (req, res) => {
	const { id } = req.params;
	db.getById(id)
		.then(action => res.status(200).json(action))
		.catch(error =>
			res.status(500).json({ error: "The action could not be retrieved." })
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

router.put("/:id", (req, res) => {
	const updatedAction = req.body;
	const { id } = req.params;
	db.update(id, updatedAction)
		.then(count => {
			if (count) {
				db.getById(id).then(action => res.status(200).json(action));
			} else {
				res.status(404).json({ error: "The action does not exist." });
			}
		})
		.catch(error =>
			res.status(500).json({ error: "The action could not be updated." })
		);
});

router.delete("/:id", (req, res) => {
	const { id } = req.params;
	db.remove(id).then(count => {
		if (count) {
			res.status(200).json({ message: "The action was successfully deleted." });
		} else {
			res.status(404).json({ error: "The action does not exist." });
		}
	});
});

module.exports = router;
