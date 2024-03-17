import mongoose from "mongoose";


export const connectDB = async()=>{
    try {
        const conn = await mongoose.connect("mongodb+srv://sonusaimanas:reddy123456789@cluster0.txdiyvn.mongodb.net/")
        console.log(`connected to mongodb database${conn.connection.host}`);
    } catch (error) {
        console.log(`error in mongodb ${error}`)
    }
}


