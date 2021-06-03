const {User} = require('../models')
const {comparePassword} = require('../helpers/bcrypt')
const {signJwt} = require('../helpers/jsonwebtoken')
const {OAuth2Client} = require('google-auth-library')

class UserController{

    static register(req,res,next){
        const {name,email,password} = req.body
        console.log(name,email,password)
        User.create({name,email,password})
        .then(user=>{
            res.status(201).json({  
                id:user.id,
                name:user.name,
                email:user.email,
            })
        }).catch(err=>{
            // console.log("yeah error")
            next(err)   
            // res.status(500).json({message:"Internal Server Error"})
        })
    }

    static login (req,res,next){    
        const email = req.body.email
        User.findOne({where:{email}})
        .then(user=>{
            if(user && comparePassword(req.body.password , user.password)){
                const access_token = signJwt({id:user.id, name:user.name, email:user.email})
                res.status(200).json({
                    id:user.id,
                    email:user.email,
                    name:user.name,
                    access_token
                })
            }else{
                res.status(401).json({message:"Invalid Username/password"})
            }
        }).catch(err=>{
            next(err)
        })
    }   

    static async glogin(req,res,next){
        try{
            const id_token = req.body.id_token 
            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
            
            const ticket = await client.verifyIdToken({
                idToken: id_token,
                audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            })
            const payload = ticket.getPayload()
            let email = payload.email
            let name = payload.name
            const findUser = await User.findOne({
                where:{email:payload.email}
            })
            if(!findUser){
                User.create({email:email,name:name,
                password:`${Math.random()*100000} Passwordnya`})
            }else{
                const access_token = signJwt({id:findUser.id,email:findUser.email,name:findUser.name})
                res.status(200).json({
                    id:findUser.id,
                    email:findUser.email,
                    name:findUser.name,
                    access_token})

            }
        }catch(err){
            next(err)
            // console.log(err)
        }
    }
}

module.exports = UserController     