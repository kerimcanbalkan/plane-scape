'use client'

import FlightCard from "@/components/FlightCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { IFlight } from "../lib/booking/models/Flight";

export default function Page() {
  const [flights, setFlights] = useState<IFlight[]>([]);
  const [nameFilter, setNameFilter] = useState<string>('');
  const [sortByDate, setSortByDate] = useState<string>('');

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get('/api/booking');
        const data = response.data;
        setFlights(data.flights);
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };

    fetchDestinations();
  }, []);

  // Filtering and Sorting Logic
  const filteredFlights = flights
    .filter(flight =>
      flight.departureCity.toLowerCase().includes(nameFilter.toLowerCase()) ||
      flight.destinationCity.toLowerCase().includes(nameFilter.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.blockOffTime).getTime();
      const dateB = new Date(b.blockOffTime).getTime();
      if (sortByDate === 'asc') return dateA - dateB;
      if (sortByDate === 'desc') return dateB - dateA;
      return 0; // no sorting if no selection is made
    });

  return (
    <div className="p-3">
      <h1 className="font-bold text-2xl mb-5">Booked Flights</h1>
      
      {/* Filters and Sort Inputs */}
      <div className="flex gap-5 mb-5">
        {/* Filter by City */}
        <input 
          type="text" 
          placeholder="Filter by destination..." 
          className="border p-2 rounded-lg"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)} // Updates the nameFilter state on every change
        />
        
        {/* Sort by Date */}
        <select
          className="border p-2 rounded-lg"
          value={sortByDate}
          onChange={(e) => setSortByDate(e.target.value)} // Updates the sortByDate state on every change
        >
          <option value="asc">Date (Ascending)</option>
          <option value="desc">Date (Descending)</option>
        </select>
      </div>

      {/* Flights Display */}
      <div className="flex flex-col w-3/4">
        {filteredFlights.length > 0 ? (
          filteredFlights.map((flight, index) => (
            <FlightCard key={index} flightData={flight} className="" button={false}/>
          ))
        ) : (
          <p>No flights available</p>
        )}
      </div>
    </div>
  )
}

