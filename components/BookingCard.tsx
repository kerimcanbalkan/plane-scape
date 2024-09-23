"use client"

import { faPlane,  faPlaneArrival,  faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomSelect from "./CustomSelect";
import CustomDatePicker from "./CustomDatePicker";
import CustomButton from "./CustomButton";
import DestinationSelect from "./DestinationSelect";
import { useEffect } from "react";
import { Destination } from "./DestinationSelect";
import { Option } from "./CustomSelect";
import axios from "axios";
import { useState } from "react";
import WarningModal from "./WarningModal";

interface Props {
    onSubmit: (data: any) => void;
    className?: string;
}

export default function BookingCard({onSubmit, className=""}:Props) {
    const departure = {label:"Amsterdam, Schipol", value:"AMS"};
    const [destination, setdestination] = useState<Option>({label:"", value:""});
    const [departureDate, setDepartureDate] = useState<Date>();
    const [options, setOptions] = useState<Option[]>([]);
    const [warning, setWarning] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission

        // Validate fields
        if (!departure || !destination || !departureDate){
            setWarning(true);
            return;
        }

        let requestData = {
            departure: departure.value,
            destination: destination.value,
            departureDate,
        };


        try {
            let flightCardData = [];
            const response = await axios.post('/api/flights', requestData);
            console.log(response.data.data);
            if (response.data.data){
                flightCardData = mapFlightData(departure,destination,response.data.data.flights); // Map the response data
            }
            onSubmit(flightCardData);
        } catch (error) {
            console.error("Error fetching flights:", error);
        }
    };


    // Fetch the destinations
    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await axios.get('/api/destinations');
                const data = response.data.data;
                const options = data
                .filter((val: Destination) => (val.city || val.publicName.english) && val.country && val.iata) // Exclude items without city or iata
                .map((val: Destination) => ({
                    label: `${val.city ? val.city+", " : ""}${val.publicName.english}, ${val.country}`,
                    value: val.iata,
                }));
                setOptions(options)
            } catch (error) {
                console.error('Error fetching destinations:', error);
            }
        };

        fetchDestinations();
    }, []);

    return (
        <div>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-md">
            <div className="mb-6 flex justify-between">
                <h2 className="flex items-center gap-2 font-bold text-md">
                    <FontAwesomeIcon icon={faPlane} className="w-5" />BOOK YOUR FLIGHT <span className="text-sm opacity-75">from</span> SCHIPOL
                </h2>
            </div>
            <div id="inputField" className="flex flex-wrap justify-between">
                <div className="flex gap-1 mb-6">
                    <div className="rounded-l-full bg-white h-8 p-2 flex items-center border-2 border-gray-300 text-sm"><FontAwesomeIcon icon={faPlaneDeparture} className="text-primary w-5 mr-3" />{departure.label}</div>

                    <DestinationSelect
                        className="rounded-r-full h-8"
                        icon={faPlaneArrival}
                        onChange={(label, value) => {
                            setdestination({label:label, value:value});
                        }}
                        options={options}
                        selected={destination.label}
                    />
                </div>
                <div className="flex gap-1">
                    <CustomDatePicker
                        className="rounded-full h-8"
                        onChange={(value) => setDepartureDate(value)}
                    />
                </div>
            </div>
            <CustomButton type="submit" text="Show Flights" className="mt-4" />
        </form>
      <WarningModal text={"Please fill in all required fields."} open={warning} setOpen={setWarning}/>
</div>
    );
}

function mapFlightData(departure: Option,destination: Option, apiResponse:any){
    return apiResponse.map((data) => ({
        flightData: {
            departureCity: departure.label.split(",")[0],
            destinationCity: destination.label.split(",")[0],
            departureAirport: departure.value,
            destinationAirport: destination.value,
            blockOffTime: data.scheduleDateTime,
            flightName: data.flightName,
        },
    }));
}
