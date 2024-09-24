import { faPlane,  faPlaneArrival,  faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomDatePicker from "./CustomDatePicker";
import CustomButton from "./CustomButton";
import DestinationSelect from "./DestinationSelect";
import { Option } from "./CustomSelect";// Option type from the select component
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
    const [warning, setWarning] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission

        // Validate fields
        if (!departure || !destination || !departureDate){
            setWarning(true);
            return;
        }

        let requestData = {
            destination: destination.value,
            departureDate,
        };


        try {
            let flightCardData = [];
            // Get the data from the api
            const response = await axios.post('/api/flights', requestData);
            // Map the data for flightCard component
            if (response.data.data){
                flightCardData = mapFlightData(departure,destination,response.data.data.flights);
            }
            // Share the data with flightCard component
            onSubmit(flightCardData);
        } catch (error) {
            console.error("Error fetching flights:", error);
        }
    };



    return (
        <div>
        <form onSubmit={handleSubmit} className={`bg-white p-8 rounded-md w-full ${className}`}>
                <h2 className="flex items-center gap-2 font-bold text-md mb-6 ">
                    <FontAwesomeIcon icon={faPlane} className="w-3 sm:w-5" />BOOK YOUR FLIGHT<span className="text-sm opacity-75">from</span>SCHIPOL
                </h2>
            {/*Input section*/}
            <div className="flex flex-wrap justify-around sm:justify-between lg:justify-start">
                <div className="flex gap-1 mb-6">
                    <div className="rounded-l-full bg-white h-8 p-2 flex items-center border-2 border-gray-300 text-xs sm:text-sm"><FontAwesomeIcon icon={faPlaneDeparture} className="text-primary w-5 mr-3" /><span className="whitespace-pre">{departure.label}</span></div>

                    <DestinationSelect
                        className="rounded-r-full h-8 text-xs sm:text-sm"
                        icon={faPlaneArrival}
                        onChange={(label, value) => {
                            setdestination({label:label, value:value});
                        }}
                        selected={destination.label}
                    />
                </div>
                <div className="flex gap-1">
                    <CustomDatePicker
                        className="rounded-full h-8 lg:ml-36"
                        onChange={(value) => setDepartureDate(value)}
                    />
                </div>
            </div>
                <div className="flex justify-center sm:justify-start">
                    <CustomButton type="submit" text="Show Flights" className="mt-4" />
                </div>
        </form>
        {/*Modal for displaying error message*/}
      <WarningModal text={"Please fill in all required fields."} open={warning} setOpen={setWarning}/>
</div>
    );
}

// Function takes the data coming from the api and maps needed fields to flightData object
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
