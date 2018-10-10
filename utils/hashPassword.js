const bcrypt = require('bcrypt')
const logger = require('winston')

const hashPassword = async valueToHash => {
  const salt = 10

  try {
    const hashedValue = await bcrypt.hash(valueToHash, salt)
    return hashedValue
  } catch (err) {
    logger.error('hashedPassword', { error: err })
    throw err
  }
}

module.exports = {
  hashPassword
}
