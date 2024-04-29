const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000
const cors = require("cors")
const mongoose = require('mongoose')
const url = process.env.MONGODB_URL
const {ERROR} = require("./utils/httpStatusText")
const bookRouter = require("./routes/book.routes") 
mongoose.connect(url).then(()=>{ console.log("connected succesfully to mongoDB server")}).catch((err)=> console.log("failed to connect", err))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use("/api/books",bookRouter)
// global middleware for Not Found router
app.all("*",(req,res,next) => {
    res.json(res.status(404).json({status: ERROR, msg: "This Resource Is Not Available"}))
  })

app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))