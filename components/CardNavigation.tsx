import { faCar, faHotel, faUmbrellaBeach } from "@fortawesome/free-solid-svg-icons";
import NavigationCard from "./NavigationCard";

interface Props {
    className?:string;
}

export default function CardNavigation({className=""}:Props){
    return (
    <div className={`flex flex-col gap-6 ${className} h-[90vh] px-3`}>
            <NavigationCard href="#CarRental" text="Car Rentals" img="/car.jpg" icon={faCar}/>
            <NavigationCard href="#Hotels" text="Hotels" img="/hotel.jpg" icon={faHotel}/>
            <NavigationCard href="#Travel" text="Travel Packages" img="/travel.jpg" icon={faUmbrellaBeach}/>
    </div>
    )
}
