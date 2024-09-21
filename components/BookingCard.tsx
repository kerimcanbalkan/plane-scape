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

export default function BookingCard() {
    const [departure, setDeparture] = useState<Option>({label:"", value:""});
    const [destination, setdestination] = useState<Option>({label:"", value:""});
    const [departureDate, setDepartureDate] = useState<Date>();
    const [arrivalDate, setarrivalDate] = useState<Date>();
    const [roundTrip, setRoundTrip] = useState<boolean>(true);
    const [options, setOptions] = useState<Option[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission

        // Validate fields
        if (!departure || !destination || !departureDate || (roundTrip && !arrivalDate)) {
            alert("Please fill in all required fields.");
            return;
        }
        let requestData = {
            departure: departure.value,
            destination: destination.value,
            departureDate,
            arrivalDate,
        };

        if (roundTrip){
            requestData = {
                departure: departure.value,
                destination: destination.value,
                departureDate,
                arrivalDate,
            };
        }
            

        try {
            const response = await axios.post('/api/flights', requestData);
            console.log(response.data);
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
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-md">
            <div className="mb-6 flex justify-between">
                <h2 className="flex items-center gap-2 font-bold text-md">
                    <FontAwesomeIcon icon={faPlane} className="w-5" />BOOK YOUR FLIGHT <span className="text-sm opacity-75">to/from</span> SCHIPOL
                </h2>
                <div className="flex gap-[1px]">
                    <button
                        type="button"
                        className={`rounded-l-full ${roundTrip ? "bg-primary text-white" : "bg-secondary text-primary"} p-2 text-bold text-sm`}
                        onClick={() => setRoundTrip(true)}
                    >
                        Round Trip
                    </button>
                    <button
                        type="button"
                        className={`rounded-r-full ${roundTrip ? "bg-secondary text-primary" : "bg-primary text-white"} p-2 text-bold text-sm`}
                        onClick={() => setRoundTrip(false)}
                    >
                        One Way
                    </button>
                </div>
            </div>
            <div id="inputField" className="flex flex-wrap justify-between">
                <div className="flex gap-1 mb-6">
                    <DestinationSelect
                        className="rounded-l-full h-8"
                        icon={faPlaneDeparture}
                        onChange={(label, value) => {
                            setDeparture({label:label, value:value});
                            setdestination({label:"Amsterdam, Schidorf, Netherlands", value:"AMS"})
                        }}
                        options={options}
                        selected={departure.label}
                    />
                    <DestinationSelect
                        className="rounded-r-full h-8"
                        icon={faPlaneArrival}
                        onChange={(label, value) => {
                            setdestination({label:label, value:value});
                            setDeparture({label:"Amsterdam, Schidorf, Netherlands", value:"AMS"})
                        }}
                        options={options}
                        selected={destination.label}
                    />
                </div>
                <div className="flex gap-1">
                    <CustomDatePicker
                        className="rounded-l-full h-8"
                        onChange={(value) => setDepartureDate(value)}
                    />
                    <CustomDatePicker
                        className="rounded-r-full h-8"
                        disabled={!roundTrip}
                        onChange={(value) => {
                            setarrivalDate(value)
                            console.log(value.toISOString())
                        }}
                    />
                </div>
            </div>
            <CustomButton type="submit" text="Show Flights" className="mt-4" />
        </form>
    );
}

