exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('folders', (table) => {
      table.increments('id').primary();
      table.string('folderName');
      table.timestamps();
    }),

    knex.schema.createTable('urls', (table) => {
      table.increments('id').primary()
      table.string('urlName');
      table.string('date');
      table.integer('clicks');
      table.integer('popularity');
      table.integer('folderId')
           .references('id')
           .inTable('folders');

      table.timestamps();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('urls'),
    knex.schema.dropTable('folders'),
  ])
};
