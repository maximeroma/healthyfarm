const joi = require('joi')
const register = require('./register.model')(joi)

const schemas = Object.create({ register })

const schemaValidator = (object, type) => {
  if (!object) {
    throw new Error('object to validate not provided')
  }

  if (!type) {
    throw new Error('schema type to validate not provided')
  }
  const { error, value } = joi.validate(object, schemas[type])

  if (error) {
    throw new Error(`invalid ${type} data, error: ${error}`)
  }

  return value
}

module.exports = Object.create({ validate: schemaValidator, schemas })
