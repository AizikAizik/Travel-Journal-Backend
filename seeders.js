import mongoose from "mongoose";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import User from "./models/userModel.js";
import Journal from "./models/journalModel.js";
import users from "./data/users.js";

dotenv.config();

connectDB();

// import dummy data to database
const importData = async () =>{
    try {
        await Journal.deleteMany();
        await User.deleteMany();

        await User.insertMany(users);

        console.log('Data Imported!!');
        process.exit();
    } catch (error) {
        console.error(`${error.message}`);
        process.exit(1);
    }
    
}

// delete all collections in the database
const deleteData = async () =>{
    try {
        await Journal.deleteMany();
        await User.deleteMany();

        console.log('Data destroyed!!');
        process.exit();
    } catch (error) {
        console.error(`${error.message}`);
        process.exit(1);
    }
    
}

// run script
if(process.argv[2] === '-d'){
    deleteData();
}else{
    importData();
}
