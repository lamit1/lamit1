const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoute = require("./routes/user")
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');

const app = express()
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
dotenv.config()

mongoose
.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("DB connect successful")
}).catch((err)=>{
    console.log(err)
})


app.use(express.json())
app.use("/api/auth",authRoute)
app.use("/api/user",userRoute)
app.use("/api/product",productRoute)
app.use("/api/cart",cartRoute)
app.use("/api/order",orderRoute)


app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running")
})