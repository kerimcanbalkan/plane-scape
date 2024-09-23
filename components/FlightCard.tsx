'use client'

import { faPlane, faPlaneArrival, faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import CustomButton from "./CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { IFlight } from "@/app/lib/booking/models/Flight";
import WarningModal from "./WarningModal";
import { useState } from "react";

export interface Props {
    flightData: IFlight,
    className?: string;
    button?: boolean;// if user wants to display the button or not
}

export default function FlightCard({flightData, className="", button=true}:Props){
    const blockOffTime = getHours(flightData.blockOffTime);
    const date = getFormattedDate(flightData.blockOffTime)
    // States for displaying the error message or succces message
    const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
    const [bookingError, setBookingError] = useState<boolean>(false);

    return (
        <div className={`bg-white rounded-lg mt-5${className}`}>
            <div className="p-8" >
                <div className="flex justify-between">
                    <h1 className="font-extrabold text-xl mb-4">{`${flightData.departureCity} - ${flightData.destinationCity}`}</h1>
                    <h2 className="font-bold text-xl mb-4">{date}</h2>
                </div>
                <div className="flex justify-between gap-10">
                    <div className="flex flex-col gap-1 items-center">
                        <p className="text-md"><FontAwesomeIcon icon={faPlaneDeparture} className="text-primary z-40 mr-2" />Departure</p>
                        <h3 className="font-bold text-xl">{blockOffTime}</h3>
                        <p className="text-sm">{`Airport: ${flightData.departureAirport}`}</p>
                    </div>
                    <div className="flex flex-col gap-1 items-center">
                        <p>{flightData.flightName}</p>
                        <FontAwesomeIcon icon={faPlane} className="text-primary z-40 text-2xl" />
                    </div>
                    <div className="flex flex-col gap-1 items-center">
                        <p className="text-md"><FontAwesomeIcon icon={faPlaneArrival} className="text-primary z-40 mr-2" />Arrival</p>
                        <p className="text-sm">{`Airport: ${flightData.destinationAirport}`}</p>
                    </div>
                </div>
            </div>
            {/*Checks the button attribute for displaying the button*/}
            {button && 
                <div className="flex justify-end">
                    <CustomButton text="Book Flight" type="submit" className="rounded-none rounded-l-lg rounded-b-lg w-2/6 h-[80px]" onClick={()=>{
                        createFlight(flightData);
                    }}/>
                </div>
            }
            <WarningModal text={"Your flight has been successfully booked!"} open={bookingSuccess} setOpen={setBookingSuccess}/>
            <WarningModal text={"Error: Unable to book your flight. Please try again later."} open={bookingError} setOpen={setBookingError}/>
        </div>
    )

    async function createFlight(flightData: IFlight): Promise<void>{
        try {
            const response = await axios.post('/api/booking', flightData);
            setBookingSuccess(true);
            console.log('Flight created:', response.data);
        } catch (error: any) {
            setBookingError(true);
            console.error('Error creating flight:', error.response?.data || error.message);
        }
    }
}

// Converts the isoString date to human readable hour
function getHours(date: string){
    const newdate = new Date(date);
    const hours = newdate.getHours().toString().padStart(2, '0');
    const minutes = newdate.getMinutes().toString().padStart(2, '0');
    const time = `${hours}:${minutes}`;
    return time;
}

// Converts the isoString date to human readable date
function getFormattedDate(date: string): string {
    const newDate = new Date(date);
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const day = newDate.getDate().toString().padStart(2, '0');
    const year = newDate.getFullYear();
    return `${month}/${day}/${year}`; // Format: MM/DD/YYYY
}

