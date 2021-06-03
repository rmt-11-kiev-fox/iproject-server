const errorHandler = (err, req, res, next) => {
    switch (err.name) {
       case "FetchApiFailed":
        res.status(err.code).json({ message: err.msg })
        break;
       case "SequelizeValidationError":
        res.status(err.code).json({ message: err.msg })
        break;
       case "SequelizeUniqueConstraintError":
        res.status(err.code).json({ message: err.msg })
        break;
       case "ResourceNotFound":
        res.status(err.code).json({ message: err.msg })
        break
       case "BadRequest":
        res.status(err.code).json({ message: err.msg })
        break
       case "JsonWebTokenError":
        res.status(err.code).json({ message: err.msg })
        break
       case "ServerError":
        res.status(err.code).json({ message: err.msg })
        break
       default:
        res.status(500).json({ message: err.msg, notes: `if this shows up alone, it means the error message is empty. one possible candidate is: error in json string thunder client` })
        break;
    }
}

module.exports = errorHandler