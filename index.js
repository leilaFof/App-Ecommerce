const express=require('express')
const dotenv=require("dotenv").config()
const connectBD=require('./db/db_Connect')
const app=express()
const port= process.env.PORT  || 3000
const userRoute=require('./routes/user')
const authRoute=require('./routes/auth')
const productRoute=require('./routes/product')
const orderRoute=require('./routes/order')
const cartRoute=require('./routes/cart')
connectBD()
app.use(express.json())
app.get('/',(req,res)=>{
    res.send("hello leila")
})
app.use('/api/users',userRoute)
app.use('/api/auth',authRoute)
app.use('/api/products',productRoute)
app.use('/api/orders',orderRoute)
app.use('/api/carts',cartRoute)
 app.listen(port,()=>{
    console.log(`le serveur est lance sur le port ${port}`);
 })