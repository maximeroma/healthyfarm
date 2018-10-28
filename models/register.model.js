const registerSchema = joi => ({
  username: joi
    .string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  email: joi.string().email({ minDomainAtoms: 2 })
})

module.exports = registerSchema
