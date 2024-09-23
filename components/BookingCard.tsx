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
            departure: departure.value,
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
        <form onSubmit={handleSubmit} className={`bg-white p-8 rounded-md ${className}`}>
            <div className="mb-6 flex justify-between">
                <h2 className="flex items-center gap-2 font-bold text-md">
                    <FontAwesomeIcon icon={faPlane} className="w-5" />BOOK YOUR FLIGHT <span className="text-sm opacity-75">from</span> SCHIPOL
                </h2>
            </div>
            {/*Input section*/}
            <div className="flex flex-wrap justify-between">
                <div className="flex gap-1 mb-6">
                    <div className="rounded-l-full bg-white h-8 p-2 flex items-center border-2 border-gray-300 text-sm"><FontAwesomeIcon icon={faPlaneDeparture} className="text-primary w-5 mr-3" />{departure.label}</div>

                    <DestinationSelect
                        className="rounded-r-full h-8"
                        icon={faPlaneArrival}
                        onChange={(label, value) => {
                            setdestination({label:label, value:value});
                        }}
                        selected={destination.label}
                    />
                </div>
                <div className="flex gap-1">
                    <CustomDatePicker
                        className="rounded-full h-10"
                        onChange={(value) => setDepartureDate(value)}
                    />
                </div>
            </div>
            <CustomButton type="submit" text="Show Flights" className="mt-4" />
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
