const express = require("express");
const router = express.Router();
const db = require("../data/helpers/actionsHelpers.js");
const joinContextsActionsDb = require("../data/helpers/joinContextsActionsHelpers.js");

router.get("/", (req, res) => {
	//if there's a context selection
	// use ?contexts=["at_computer"] to select the contexts
	if (req.query.contexts) {
		const contexts = JSON.parse(req.query.contexts);

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

/* Returns
{
    "id": 1,
    "project_id": 1,
    "action_name": "test 1",
    "action_desc": "this is a test description",
    "action_completed": 0,
    "contexts": [
        {
            "context_name": "at_computer"
        },
        {
            "context_name": "at_home"
        }
    ]
}
*/
router.get("/:id", (req, res) => {
	const { id } = req.params;

	//get the action and then add on the contexts
	db.getById(id)
		.then(action => {
			const actionObject = { ...action[0] };
			joinContextsActionsDb.getContextsActions(id).then(actions => {
				actionObject.contexts = [...actions];
				res.status(200).json(actionObject);
			});
		})
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
