const db = require("../dbConfig.js");

module.exports = {
	getAll: () => {
		return db("projects");
	},
	getById: id => {
		return db("projects").where({ "projects.id": id });
	},
	add: project => {
		return db
			.insert(project)
			.into("projects")
			.then(ids => ids[0]);
	},
	update: (id, project) => {
		return db("projects")
			.where({ id: id })
			.update(project);
	},
	remove: id => {
		return db("projects")
			.where({ id: Number(id) })
			.del();
	}
};
