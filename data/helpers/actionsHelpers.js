const db = require("../dbConfig.js");

module.exports = {
	getAll: () => {
		return db("actions");
	},
	getById: id => {
		return db("actions")
		.where({ "actions.id": id })
	},
	getActionsByProject: id=>{
		return db.select("id","action_name as name","action_desc as description","action_completed as completed").from("actions").where({ "project_id": id })
	},
	add: project => {
		return db
			.insert(project)
			.into("actions")
			.then(ids => ids[0]);
	},

};
