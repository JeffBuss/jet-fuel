exports.seed = function(knex, Promise) {
  return knex('folders').del()
  .then(() => {
    return Promise.all([
      knex('folders').insert({
        id: 1,
        folderName: 'Music',
      }),
      knex('folders').insert({
        id: 2,
        folderName: 'Books',
      }),
      knex('folders').insert({
        id: 3,
        folderName: 'Movies',
      }),
    ]);
  });
};
