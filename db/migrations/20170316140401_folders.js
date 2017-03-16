
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('folders', (table) => {
      table.integer('id').primary();
      table.string('folderName');
      table.timestamps();
    }),

    knex.schema.createTable('urls', (table) => {
      table.integer('id').primary()
      table.integer('folderId');
      table.string('urlName');
      table.string('date');
      table.integer('popularity');
      table.timestamps();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('folders'),
    knex.schema.dropTable('urls'),
  ])
};
