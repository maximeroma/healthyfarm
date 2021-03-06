const db = require('../db')

const tableName = 'users'

const UserService = {
  insert: credentials => {
    return db(tableName)
      .insert(credentials)
      .returning('id')
      .then(result => result[0])
  },

  getLogin: email => {
    return db(tableName)
      .where({ email })
      .returning('*')
      .then(result => result[0])
  },

  getAllUser: () => {
    return db(tableName)
      .returning('*')
      .then(result => result)
  }
}

module.exports = UserService
