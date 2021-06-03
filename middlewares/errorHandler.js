const errorHandler= (err,req,res,next) =>{
    if(err.name === "Sequelize Validation Error"){
        let errors = []
        err.errors.forEach(e=>{
            errors.push(e.message)
        })
        res.status(400).json({message:errors})
    }else{
        res.status(500).json({message:"Internal Server Error"})
    }
}

module.exports = errorHandler