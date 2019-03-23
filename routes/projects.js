const express = require("express");
const router = express.Router();
const db = require("../data/helpers/projectsHelpers.js");
const actionDb = require("../data/helpers/actionsHelpers.js");

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
		.then(project => {
			const projectObject = { ...project[0] };
			actionDb.getActionsByProject(id).then(actions => {
				projectObject.actions = [...actions];
				res.status(200).json(projectObject);
			});
		})
		.catch(error =>
			res.status(500).json({ error: "The project could not be retrieved." })
		);
});

router.post("/", (req, res) => {
	const newProject = req.body;
	db.add(newProject)
		.then(id => {
			db.getById(id).then(project => res.status(201).json(project));
		})
		.catch(error =>
			res.status(500).json({ error: "The project could not be created." })
		);
});

router.put("/:id", (req, res) => {
	const updatedProject = req.body;
	const { id } = req.params;
	db.update(id, updatedProject)
		.then(count => {
			if (count) {
				db.getById(id).then(project => res.status(200).json(project));
			} else {
				res.status(404).json({ error: "The project does not exist." });
			}
		})
		.catch(error =>
			res.status(500).json({ error: "The project could not be updated." })
		);
});

router.delete("/:id", (req, res) => {
	const { id } = req.params;
	db.remove(id).then(count => {
		if (count) {
			res
				.status(200)
				.json({ message: "The project was successfully deleted." });
		} else {
			res.status(404).json({ error: "The project does not exist." });
		}
	});
});

module.exports = router;
