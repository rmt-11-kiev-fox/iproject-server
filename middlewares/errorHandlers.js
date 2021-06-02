module.exports = (err, req, res, next) => {
    if (err.name === 'InvalidToken') {
        res.status(401).json({ message: 'Invalid Token'})
    } else if (err.name === 'PleaseLogin') {
        res.status(401).json({ message: 'Please Login First!'})
    } else if (err.name === 'InvalidEmailPass') {
        res.status(401).json({ message: 'Invalid Email or Password!'})
    } else if (err.name === 'Invalid') {
        res.status(400).json({ message: 'Invalid Requests'})
    } else if (err.name === 'NotFound') {
        res.status(404).json({ message: 'Data Not Found'})
    } else {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}