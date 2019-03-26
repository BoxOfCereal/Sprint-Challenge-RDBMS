exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("projects")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("projects").insert([
        {
          project_name: "test 1",
          project_desc: " test description",
          project_notes: "test notes",
          project_completed: false
        },
        {
          project_name: "test 2",
          project_desc: " test description",
          project_notes: "test notes",
          project_completed: false
        },
        {
          project_name: "test 3",
          project_desc: " test description",
          project_notes: "test notes",
          project_completed: false
        },
        {
          project_name: "test 4",
          project_desc: " test description",
          project_notes: "test notes",
          project_completed: false
        }
      ]);
    });
};
