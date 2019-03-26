exports.up = function(knex, Promise) {
	return knex.schema.createTable("contexts", table => {
		table.increments();
		table
			.string("context_name")
			.notNullable()
			.unique();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists("contexts");
};
