import mongoose from "mongoose";
const connectdb = async () =>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log("connection successful");
    } catch (error) {
        console.log("connection error");
    }
}
export default connectdb;