const express=require("express")
const app=express()
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const userRoute=require("./routes/user")
const authRoute=require("./routes/auth")
const productRoute=require("./routes/product")
const orderRoute=require("./routes/order")
const cartRoute=require("./routes/cart")
const stripeRoute = require("./routes/stripe");
const cors=require("cors")
const mailRoute = require("./routes/mail")




dotenv.config()
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DB Connection Successfull!"))
.catch((err)=>{console.log(err)})

app.use(cors())
app.use(express.json())
app.use("/api/auth",authRoute)
app.use("/api/user",userRoute)
app.use("/api/products",productRoute)
app.use("/api/orders",orderRoute)
app.use("/api/cart",cartRoute)
app.use("/api/checkout", stripeRoute);
app.use("/api/mail", mailRoute);



app.listen(process.env.PORT || 5000,()=>{
    console.log("backend sever is running")
})