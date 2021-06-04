let errorHandler = function (err, req, res, next){
  console.log('err', err.name)
  if (err.code){
      res.status(err.code).json({message: err.msg})
  } else {
    let errors = []
    let statusCode = 500
  
      switch (err.name) {
        case 'SequelizeValidationError':
            err.errors.forEach(el => {
              errors.push(el.message)
            });
            statusCode = 400
          break;
          case 'SequelizeUniqueConstraintError':
            err.errors.forEach(el => {
              errors.push(el.message)
            });
            statusCode = 400
          break;
        default:
          errors.push(err.msg || 'Internal Server Error')
          statusCode = err.status || statusCode
          break;
      }
        res.status(statusCode).json({
          errors
        })
  }
  
}

module.exports = errorHandler