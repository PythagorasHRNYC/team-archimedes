const knex = require('knex')({
  client: 'pg',
  connection: {
    user: 'root',
    database: 'flock',
    charset: 'utf8',
  }
})

knex.schema.hasTable('favorites').then(exists => {
  if (!exists) {
    knex.schema.createTable('favorites', (table) => {
      table.increments('id').primary();
      table.integer('userId');
      table.string('favorite');
    })
    .then(() => console.log('Created favorites'));
  }
})

knex.schema.hasTable('users').then(exists => {
  if (!exists) {
    knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username');
      table.string('email');
    })
    .then(() => console.log('Created users'))
  }
})

const db = require('bookshelf')(knex);

module.exports = {db, knex}