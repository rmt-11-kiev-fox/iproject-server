if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}
const express = require('express')
const indexRouter = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

const app = express()
const PORT = +process.env.PORT || 3000


app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

// app.get("/success", (req, res) => {
//     console.log("success");
    
//     const path = resolve(process.env.STATIC_DIR + "/success.html");
//     res.sendFile(path);
//   });
  
//   app.get('/checkout-session',async(req,res) => {
//     const session = await stripe.checkout.sessions.retrieve(req.query.id,{
//       expand:['line_items']
//     })
//     res.json(session)
//   })
  


app.use(indexRouter)
app.use(errorHandler)


app.listen(PORT, (req, res) => {
    console.log(`This app is running on port: ${PORT}`)
})