import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// Since api does not allow querying with city name or something similar. I could not figure a way around to fetch all destinations
export async function GET() {
  const res = await axios.get(
    `https://api.schiphol.nl/public-flights/destinations?page=93&sort=city`,
    {
      headers: {
        'ResourceVersion': 'v4',
        'app_id': process.env.SCHIPHOL_APP_ID,
        'app_key': process.env.SCHIPHOL_APP_KEY,
      }
    }
  );

  const data = res.data.destinations;

  return Response.json({data});
}
