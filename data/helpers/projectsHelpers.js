const db = require("../dbConfig.js");

module.exports = {
	getAll: () => {
		return db("projects");
	},
	getById: id => {
		return db("projects")
		.where({ id: id })
		.innerJoin("actions","actions.project_id","projects.id");
	}
};
