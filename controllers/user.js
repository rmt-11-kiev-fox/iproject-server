const {User} = require("../models")
const {decode} = require("../helpers/bcrypt")
const {sign} = require("../helpers/jwt")

class Controller{
    static registerUser(req, res, next) {
        let userData = {
            name:req.body.name,
            email:req.body.email,
            role:req.body.role,
            password:req.body.password
        }
        User
        .create(userData)
        .then((data)=>{
            res.status(201).json({
                name:data.name,
                msg:"Account Created"
            })
        })
        .catch((err)=>{
            if(err.name==="ServerError"){
                next({name: "ServerError", message:err.message})
            }
            else{
                next({name: "SequelizeValidationError", err})
            }
        })
    }
    static loginUser(req, res, next){
        let userData = {
            email:req.body.email,
            password:req.body.password,
            id:req.body.id
        }
        User
        .findOne({
            where:{
                email: userData.email
            }
        })
        .then((data)=>{
            if(data){
                if(decode(userData.password,data.password)){
                    let payload = {
                        name:data.name,
                        email:data.email,
                        role:data.role,
                        id:data.id,
                        verified:data.verified
                    }
                    const access_token = sign(payload)
                    res.status(200).json({access_token})
                }
                else{
                    next({name:"BadRequest", message:"Invalid username/password"})
                }
            }
            else{
                next({name:"BadRequest", message:"Invalid username/password"})
            }
        })
        .catch((err)=>{
            next({name: "ServerError", message:err.message})
        })
    }

}

module.exports = Controller