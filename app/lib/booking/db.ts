import mongoose from "mongoose"

// The 'isConnected' property will store whether we are connected to the database
const connection: {isConnected?: number} = {};

// Asynchronous function to connect to the MongoDB database
export default async function connectDB(){
    // Check if there's already a connection established
    if (connection.isConnected){
        return;
    }

    try {
    // Attemp to connect to the MongoDB database
    const db = await mongoose.connect(process.env.MONGO_URI!);

    // Store the connection state
    connection.isConnected = db.connections[0].readyState;
    }catch(err){
        console.error(err);
    }

}
