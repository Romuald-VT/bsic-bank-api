const {dbConnection} = require('./db')
const cors = require('cors')
const express = require('express')
const { errorHandler } = require('./middleware/errorMiddleware')
const { userRouter } = require('./route/userRoute')
const { customerRouter } = require('./route/customerRoute')
const compression = require('compression')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit');

const app = express()
const port = process.env.SERVER_PORT || 4000


dbConnection()
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(compression())
app.use(helmet())
app.use(limiter);


app.use("/api/users",userRouter)
app.use("/api/customers",customerRouter)
app.use(errorHandler)
app.listen(port,()=>{
    console.log("the server is running on port ",port)
})

