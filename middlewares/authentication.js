const {verifyJwt} = require('../helpers/jsonwebtoken')
const {User} = require ('../models')

function authentic(req,res,next){
    const access_token = req.headers.access_token
    try{
        const payload =  verifyJwt(access_token)
        User.findByPk(payload.id)
        .then(user=>{
            if(user){
                req.user = user;
                next()
            }else{
                res.status(401).json({message:"Not Authorized"})
            }
        }).catch(err=>{
            res.status(500).json({message:"Internal Server Error"})
        })
    }catch(err){
        res.status(401).json({message:"UnAuthorized"})
    }
}
module.exports = {authentic}
