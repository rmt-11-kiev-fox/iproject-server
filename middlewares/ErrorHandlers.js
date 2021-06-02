function errorHandler(err, req, res, next){
    if (err.name === 'SequelizeValidationError') {
        const errors = err.errors.map((el) => el.message);
        res.status(400).json({ message: 'Validation Error', errors });
    } else if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ message: err.message})
    } else {
        res.status(err.status || 500).json({
          message: err.message || 'Internal Server Error'
        });
    }
}

module.exports = errorHandler