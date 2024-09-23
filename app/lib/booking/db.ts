import mongoose from "mongoose"

const connection: {isConnected?: number} = {};

export default async function connectDB(){
    if (connection.isConnected){
        return;
    }

    try {
    const db = await mongoose.connect(process.env.MONGO_URI!);
    connection.isConnected = db.connections[0].readyState;
    }catch(err){
        console.error(err);
    }

}
