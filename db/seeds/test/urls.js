exports.seed = function(knex, Promise) {
  return knex('urls').del()
  .then(() => {
    return Promise.all([
      knex('urls').insert({
        id: 1,
        urlName: 'http://www.books.com',
        clicks: 0,
      }),
      knex('urls').insert({
        id: 2,
        urlName: 'http://www.movies.com',
        clicks: 0,
      }),
      knex('urls').insert({
        id: 3,
        urlName: 'http://www.music.com',
        clicks: 0,
      })
    ]);
  });
};
