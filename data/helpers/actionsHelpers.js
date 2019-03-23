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
	getActionsByContext: contexts => {
		let query = db
			.select(
				"actions.id",
				"actions.action_name",
				"actions.action_desc",
				"actions.action_completed",
				"contexts.context_name"
			)
			.from("joinContextsActions")
			.innerJoin("actions", "actions.id", "joinContextsActions.action_id")
			.innerJoin("contexts", "contexts.id", "joinContextsActions.context_id");
		query.whereIn("contexts.context_name", contexts);
		console.log(query.toSQL().toNative());

		return query;
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
