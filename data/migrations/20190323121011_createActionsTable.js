exports.up = function(knex, Promise) {
	return knex.schema.createTable("actions", table => {
		table.increments();
		table.integer("project_id").notNullable();
		table.string("action_name").notNullable();
		table.string("action_desc");
		table.boolean("action_completed").defaultTo(false);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists("actions");
};
