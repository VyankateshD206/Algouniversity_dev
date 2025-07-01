const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const DBconnection = async()=>{
   const MONGO_URI = process.env.MONGODB_URL;
   try{
    await mongoose.connect(MONGO_URI);
    console.log('DB connection established');
   }catch(error){
    console.log(`error while DB connection${error}`);
   }
};

module.exports = {DBconnection};