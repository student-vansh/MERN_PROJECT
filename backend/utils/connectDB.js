const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () =>{
    try{
        // console.log(process.env.MONGODB_URL);
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Name:", mongoose.connection.name);
        console.log("Database Connected");
        
    } catch(error){
        console.log(error)
       console.log("Database in ERROR")
    }
}

// main()
//   .then(() => {
//     console.log("Connection successful");
//   })
//   .catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/Notes");
// }
module.exports = connectDB;
