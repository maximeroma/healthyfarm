const tableName = 'users'

function up(knex, Promise) {
  return knex.schema.createTable(tableName, table => {
    table.increments('id')
    table.string('username').notNullable()
    table.string('email').notNullable()
    table.string('password').notNullable()
    table.boolean('isAdmin').defaultTo(false)
  })
}

function down(knex, Promise) {
  return knex.schema.dropTableIfExists(tableName)
}

module.exports = {
  up,
  down
}
