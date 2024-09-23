import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export async function POST(request: Request) {
  const body = await request.json();
  let {departure, destination, departureDate} = body;
  
  const data = await getFlights(departure, destination, departureDate)
  return Response.json({data});
}

async function getFlights(departure:string, destination:string, departureDate:string){
  const fromDateTime = encodeURIComponent(departureDate.slice(0,19));
  const to = new Date(departureDate);
  to.setHours(23,59);
  const toDateTime = encodeURIComponent(to.toISOString().slice(0,19));

  const url = `https://api.schiphol.nl/public-flights/flights?flightDirection=D&route=${destination}&includedelays=false&page=0&sort=%2BscheduleTime&fromDateTime=${fromDateTime}&toDateTime=${toDateTime}`;

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
