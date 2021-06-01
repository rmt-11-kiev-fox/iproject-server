const errorHandler = async (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).json({ message: err.msg })
    } else if (err.errors) {
        let message = err.errors.map(el => el.message)
        res.status(400).json({ message })
    } else {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = errorHandler