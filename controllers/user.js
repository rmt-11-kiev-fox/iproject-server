const {User} = require("../models")
const {decode} = require("../helpers/bcrypt")
const {sign} = require("../helpers/jwt")
const nodemailer = require("nodemailer")

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
            //NODEMAILER
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 465,
                secure: true, // use SSL
                auth: {
                    user: 'hacktiv8burneremail@gmail.com',
                    pass: '12ChairmanFaza'
                }
            });
            let mailOptions = {
                from: 'hacktiv8burneremail@gmail.com',
                to: 'renaissancegame.hacktiv@yahoo.com', 
                subject: 'Renaissance Game',
                text: 'Terima Kasih telah menjadi member Renaissance Game, selamat bermain'
            };
            transporter.sendMail(mailOptions, (err, data) => {
                if (err) {
                    console.log('Error occurs', err);
                } else {
                    console.log('Email sent!!!');
                }
            });
            //NODEMAILER
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
    static async getProfile(req, res, next){
        let id = req.body.UserId
        try{
            let userData = await User.findByPk(id)
            let data = {
                name: userData.name,
                email: userData.email,
                achievement: userData.achievement
            }
            res.status(200).json(data)
        }
        catch(err){
            console.log(err);
        }
    }
    static async getSelfProfile(req, res, next){
        let id = req.user.id
        try{
            let userData = await User.findByPk(id)
            let data = {
                name: userData.name,
                email: userData.email,
                achievement: userData.achievement
            }
            res.status(200).json(data)
        }
        catch(err){
            console.log(err);
        }
    }

}

module.exports = Controller