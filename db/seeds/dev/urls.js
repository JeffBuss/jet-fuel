exports.seed = function(knex, Promise) {
  return knex('urls').del()
  .then(() => {
    return Promise.all([
      knex('urls').insert({
        id: 1,
        folderId: 1,
        urlName: 'http://www.music.com',
        date: '01/01/11',
        popularity: 1,
      }),
      knex('urls').insert({
        id: 2,
        folderId: 2,
        urlName: 'http://www.books.com',
        date: '02/02/22',
        popularity: 2,
      }),
      knex('urls').insert({
        id: 3,
        folderId: 3,
        urlName: 'http://www.movies.com',
        date: '03/03/33',
        popularity: 3,
      }),
    ]);
  });
};
