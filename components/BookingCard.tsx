"use client"

import { faPlane, faPlaneArrival, faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomSelect from "./CustomSelect";
import CustomDatePicker from "./CustomDatePicker";
import CustomButton from "./CustomButton";
import { useState } from "react";

// Temporary
const options =[
    {value: 'milano', label: 'Milano'},
    {value: 'barcelona', label: 'Barcelona'},
    {value: 'tiran', label: 'Tiran'},
]

export default function BookingCard(){
    const [departure, setDeparture] = useState<string>("");
    const [arrival, setArrival] = useState<string>("");
    const [departureDate, setDepartureDate] = useState<Date>();
    const [arrivalDate, setArrivalDate] = useState<Date>();
    const [roundTrip, setRoundTrip] = useState<boolean>(true);
    return (
        <div className="bg-white p-8 rounded-md">
            <div className="mb-6 flex justify-between">
                <h2 className="flex items-center gap-2 font-bold text-md"><FontAwesomeIcon icon={faPlane} className=" w-5" />BOOK YOUR FLIGHT</h2>
                <div className="flex gap-[1px]">
                    <button className={`rounded-l-full ${roundTrip ? "bg-primary text-white" : "bg-secondary text-primary"} p-2 text-bold text-sm`} onClick={() => setRoundTrip(true)}>Round Trip</button>

                    <button className={`rounded-r-full ${roundTrip ? "bg-secondary text-primary" : "bg-primary text-white"} p-2 text-bold text-sm`} onClick={() => setRoundTrip(!true)}>One Way</button>

                </div>
            </div> 
            <div id="inputField" className="flex flex-wrap justify-between">
                <div className="flex gap-1 mb-6">
                    <CustomSelect className="rounded-l-full" options={options} icon={faPlaneDeparture} onChange={(value) => {setDeparture(value)}}/>
                    <CustomSelect className="rounded-r-full" options={options} icon={faPlaneArrival} onChange={(value) => {setArrival(value)}}/>
                </div>
                <div className="flex gap-1 mb-8">
                    <CustomDatePicker className="rounded-l-full" onChange={(value) => {setDepartureDate(value)}}/>
                    <CustomDatePicker className="rounded-r-full"disabled={!roundTrip} onChange={(value) => {setArrivalDate(value)}}/>
                </div>
            </div>
            <CustomButton text="Show Flights"/>
        </div>
    )
}
