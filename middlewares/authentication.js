const { verify } = require('../helpers/jwt.js')
const { User } = require('../models')

function authentication(req, res, next) {
    let header = req.headers.access_token
    // console.log(header,'<<<<di authen');
    if (header) {
        const decoded = verify(header)
        // console.log(decoded);
        User.findOne({
            where: { id: decoded.id }
        })
            .then(foundUser => {
                // console.log(foundUser);
                if (foundUser) {
                    req.loggedUser = foundUser.id
                    next()
                } else {
                    res.status(403).json('Invalid Access Token')
                }
            })
            .catch(err => {
                res.status(500).json({message: err.message})
            })
    }
}

module.exports = authentication