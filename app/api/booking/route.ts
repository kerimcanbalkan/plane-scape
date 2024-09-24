import connectDB from "@/app/lib/booking/db"
import Flight from "@/app/lib/booking/models/Flight";

export async function GET() {
    // Ensure the database is connected before executing any queries
    await connectDB();

    try {
        // Retrieve all flight records from the database
        const flights = await Flight.find({});

        return Response.json({ flights });
    } catch (err: any) {
        return Response.json({ error: err.message });
    }
}

export async function POST(request: Request) {
    // Ensure the database is connected before executing any queries
    await connectDB();

    try {
        // Parse the incoming JSON request body for flight data
        const flightData = await request.json(); 

        // Create a new instance of the Flight model with the received data
        const flight = new Flight(flightData);

        // Save the flight document to the database
        await flight.save();
        return Response.json({ flight });
    } catch (err: any) {
        return Response.json({ error: err.message });
    }
}
