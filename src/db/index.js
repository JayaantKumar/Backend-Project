import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        // USing `${} for injecting variable.`
      const connnectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
      // ${connnectionInstance.connection.host}` it is done to now where our url hosting done.If by chance we move to another URL.
      console.log(`\n MongoDB connnected !! DB HOST: ${connnectionInstance.connection.host}`);  
    } catch (error) {
        console.log("MONGODB connnection errorrrrrrrrrrrrrrrr", error);
        // it is a method used to handle erroe!!!
        process.exit(1)
    }
}

export default connectDB