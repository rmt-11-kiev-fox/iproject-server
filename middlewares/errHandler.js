const errHandler = (err, req, res, next) => {
  let statusCode = err.statusCode
  let errors = []

  switch (err.name) {
    case 'SequelizeUniqueConstraintError':
      err.errors.forEach(error => {
        errors.push(`'${error.value}' has already been used. Try another.`)
      });
      statusCode = 400      
      break;
    case 'SequelizeValidationError':
      err.errors.forEach(error => {
        errors.push(error.message)
      })
      statusCode = 400
      break
    case 'JsonWebTokenError':
      errors.push('User Not Authenticated')
      statusCode = 401
      break    
    default:
      errors.push(err.message)
      statusCode = err.statusCode || 500
      break;
  }

  return res.status(statusCode).json({errors})
}

module.exports = errHandler
