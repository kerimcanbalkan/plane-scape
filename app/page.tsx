'use client'

import BookingCard from "@/components/BookingCard";
import FlightCard from "@/components/FlightCard";
import { FlightCardData } from "@/components/FlightCard";
import WarningModal from "@/components/WarningModal";
import { useState } from "react";

export default function Home() {
  const [flightData, setFlightData] = useState<FlightCardData[]>([]);
  const [warning, setWarning] = useState<boolean>(false);

  const handleBookingSubmit = (data:FlightCardData[]) => {
    setFlightData(data);
    if (data.length === 0){
      setWarning(true);
    }
  }

  return (
    <div className="container">     
      <BookingCard onSubmit={handleBookingSubmit} />
      <div className="overflow-y-auto flex flex-col max-h-[60vh] w-3/5 custom-scroll">
        {flightData.length > 0 && flightData.map((flight, index) => (
          <FlightCard key={index} flightData={flight.flightData} />
        ))}
      </div>
      <WarningModal text={"Could not found flights to destination"} open={warning} setOpen={setWarning}/>
    </div>
  );
}

