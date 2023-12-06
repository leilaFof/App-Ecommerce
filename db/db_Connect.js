const mongoose=require('mongoose')
 const connectBD= async()=>{
    try{
        const connect = await mongoose.connect(process.env.CONNECT_STRING)
        console.log(`la base de donnee est connecte sur le serveur ${connect.connection.host} ${connect.connection.name}`);
    }catch(err){
        console.log(err);
        process.exit(1)
    }
 }
  module.exports=connectBD