const {AnimeFav} = require('../models')

function authorized (req,res,next){
    const id = +req.params.id
    // console.log(id, "<<<<<<<<<<<<<<,,,") 
    AnimeFav.findByPk(id)
    .then(anime=>{
        // console.log(anime.UserId,"aaaaaaaaaaaaaa")
        if(anime){
            if(anime.UserId === req.user.id){
                // console.log('aaaa')
                next()
            }else{
                // console.log('bbb')
                res.status(401).json({message:"Not Authorized"})
            }
        }else{
            // console.log('ccc');
            res.status(401).json({message:'Not Authorized'})
        }
    }).catch(err=>{
        next(err)
    })
}

module.exports = {authorized}   