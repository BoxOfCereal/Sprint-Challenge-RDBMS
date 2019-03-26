exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("actions")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("actions").insert([
        {
          project_id: 1,
          action_name: "test 1",
          action_desc: "this is a test description",
          action_completed: false
        },
        {
          project_id: 1,
          action_name: "test 2",
          action_desc: "this is a test description",
          action_completed: false
        },
        {
          project_id: 2,
          action_name: "test 1",
          action_desc: "this is a test description",
          action_completed: false
        },
        {
          project_id: 2,
          action_name: "test 2",
          action_desc: "this is a test description",
          action_completed: false
        },
        {
          project_id: 3,
          action_name: "test 1",
          action_desc: "this is a test description",
          action_completed: false
        },
        {
          project_id: 3,
          action_name: "test 2",
          action_desc: "this is a test description",
          action_completed: false
        },
        {
          project_id: 4,
          action_name: "test 1",
          action_desc: "this is a test description",
          action_completed: false
        },
        {
          project_id: 4,
          action_name: "test 2",
          action_desc: "this is a test description",
          action_completed: false
        }
      ]);
    });
};
