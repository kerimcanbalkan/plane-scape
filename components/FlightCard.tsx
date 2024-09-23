import { faPlane, faPlaneArrival, faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import CustomButton from "./CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface FlightCardData {
    flightData: {
        departureCity: string,
        departureAirport: string;
        destinationCity: string;
        destinationAirport: string;
        blockOffTime: string;
        landingTime:string;
        flightName:string;
    },
    className?: string;
}

export default function FlightCard({flightData, className=""}:FlightCardData){
    const blockOffTime = getHours(flightData.blockOffTime);
    const landingTime = getHours(flightData.landingTime);
    console.log(flightData);

    return (
        <div className={`bg-white rounded-lg mt-5${className}`}>
            <div className="p-8" >
                <h1 className="font-extrabold text-xl mb-4">{`${flightData.departureCity} - ${flightData.destinationCity}`}</h1>
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
            <div className="flex justify-end">
                <CustomButton text="Book Flight" type="submit" className="rounded-none rounded-l-lg rounded-b-lg w-2/6 h-[60px]"/>
            </div>
        </div>
    )
}

function getHours(date: string){
    const newdate = new Date(date);
    const hours = newdate.getHours().toString().padStart(2, '0');
    const minutes = newdate.getMinutes().toString().padStart(2, '0');
    const time = `${hours}:${minutes}`;
    return time;
}
