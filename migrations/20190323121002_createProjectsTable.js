exports.up = function(knex, Promise) {
	return knex.schema.createTable("projects", table => {
		table.increments();
		table.string("project_name").notNullable();
		table.string("project_desc");
		table.string("project_notes");
		table.boolean("project_completed").defaultTo(false);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists("projects");
};
