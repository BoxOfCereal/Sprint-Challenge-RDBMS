const db = require("../dbConfig.js");

module.exports = {
	getAll: () => {
		return db("actions");
	},
	getById: id => {
		return db("actions")
		.where({ "actions.id": id })
	},
	add: project => {
		return db
			.insert(project)
			.into("actions")
			.then(ids => ids[0]);
	},

};
