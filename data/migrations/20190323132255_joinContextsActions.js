exports.up = function(knex, Promise) {
	return knex.schema.createTable("joinContextsActions", table => {
		table.increments();
		table.integer("action_id").notNullable();
		table.integer("context_id").notNullable();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists("joinContextsActions");
};
