import connectDB from "@/app/lib/booking/db"
import Flight from "@/app/lib/booking/models/Flight";

export async function GET() {
    await connectDB();

    try {
        const flights = await Flight.find({});
        return Response.json({ flights });
    } catch (err: any) {
        return Response.json({ error: err.message });
    }
}

export async function POST(request: Request) {
    await connectDB();

    try {
        const flightData = await request.json(); 
        console.log('Received flight data:', flightData);
        const flight = new Flight(flightData);
        await flight.save();
        return Response.json({ flight });
    } catch (err: any) {
        return Response.json({ error: err.message });
    }
}
