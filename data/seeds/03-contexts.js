exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("contexts")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("contexts").insert([
        { context_name: "at_computer" },
        { context_name: "at_home" },
        { context_name: "at_work" },
        { context_name: "alive" }
      ]);
    });
};
