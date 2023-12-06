const expres=require('express')
const dotenv=require("dotenv").config()
const connectBD=require('./db/db_Connect')
const app=expres()
const port= process.env.PORT  || 3000
connectBD()
app.get('/',(req,res)=>{
    res.send("hello leila")
})
 app.listen(port,()=>{
    console.log(`le serveur est lance sur le port${port}`);
 })