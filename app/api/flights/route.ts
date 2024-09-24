import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export async function POST(request: Request) {
  // Parse the incoming request body
  const body = await request.json();

  // Extract necessary values for the Schipol Api
  let {destination, departureDate} = body;
  
  // Fetch flight data
  const data = await getFlights(destination, departureDate)
  return Response.json({data});
}

// Helper function to fetch flights from the Schiphol API
async function getFlights(destination:string, departureDate:string){
  // Encode the departureDate for the API request 
  const fromDateTime = encodeURIComponent(departureDate.slice(0,19));

  // Create a new date object and set the time to the end of the day (23:59)
  const to = new Date(departureDate);
  to.setHours(23,59);

  // Encode the end of the day for the API request 
  const toDateTime = encodeURIComponent(to.toISOString().slice(0,19));

  const url = `https://api.schiphol.nl/public-flights/flights?flightDirection=D&route=${destination}&includedelays=false&page=0&sort=%2BscheduleTime&fromDateTime=${fromDateTime}&toDateTime=${toDateTime}`;

  // Make the GET request to the Schiphol API with the appropriate headers
  const res = await axios.get(
    url,
    {
      headers: {
        'ResourceVersion': 'v4',
        'app_id': process.env.SCHIPHOL_APP_ID,
        'app_key': process.env.SCHIPHOL_APP_KEY,
      }
    }
  );

  return res.data;
}
