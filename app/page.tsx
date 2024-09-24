'use client'

import BookingCard from "@/components/BookingCard";
import CardNavigation from "@/components/CardNavigation";
import FlightCard from "@/components/FlightCard";
import WarningModal from "@/components/WarningModal";
import { useState } from "react";
import { IFlight } from "./lib/booking/models/Flight";

// Data type coming from the bookingCard
interface FlightData {
  flightData: IFlight;
}

export default function Home() {
  const [flightData, setFlightData] = useState<FlightData[]>([]);
  const [warning, setWarning] = useState<boolean>(false);// for opening the modal

  const handleBookingSubmit = (data:FlightData[]) => {
    setFlightData(data);
    if (data.length === 0){
      setWarning(true);
    }
  }

  return (
    <div >     
      <div className="w-full flex">

        {/*Booking flight section*/}
        <div id="booking" className="w-full m-2 lg:m-0 lg:w-[80%]">
          <BookingCard onSubmit={handleBookingSubmit} />
          <div className="overflow-y-auto flex flex-col max-h-[60vh] w-full sm:w-3/4 custom-scroll">
            {flightData.length > 0 && flightData.map((flight, index) => (
              <FlightCard key={index} flightData={flight.flightData} />
            ))}
          </div>
        </div>

        {/*Card navigation at the right side*/}
        <CardNavigation className="w-[20%] hidden lg:flex"/>
      </div>

      {/*Modal for error displaying*/}
      <WarningModal text={"No flights available for the selected destination and date. Please try a different date or destination."} open={warning} setOpen={setWarning}/>
    </div>
  );
}

