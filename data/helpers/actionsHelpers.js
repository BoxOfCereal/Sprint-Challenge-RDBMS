const db = require("../dbConfig.js");

module.exports = {
	getAll: () => {
		return db("actions");
	},
	getById: id => {
		return db("actions").where({ "actions.id": id });
	},
	getActionsByProject: id => {
		return db
			.select(
				"id",
				"action_name as name",
				"action_desc as description",
				"action_completed as completed"
			)
			.from("actions")
			.where({ project_id: id });
	},
	add: action => {
		return db
			.insert(action)
			.into("actions")
			.then(ids => ids[0]);
	},
	update: (id, action) => {
		return db("actions")
			.where({ id: id })
			.update(action);
	},
	remove: id => {
		return db("actions")
			.where({ id: Number(id) })
			.del();
	}
};
