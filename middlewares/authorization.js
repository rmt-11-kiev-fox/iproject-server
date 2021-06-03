
let authorization = async function(req, res, next){
 
  try{
   let isUser = req.currentUser
    if(!isUser.isAdmin){
      throw {message: 'User not allowed', status: 403}
    } else {
      next()
    }
   
  }
  catch(err){
    let status = err.status || 500
    let message = err.message || 'Internal sever error'
    res.status(status).json({message})
  }
}

module.exports = authorization