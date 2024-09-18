import { faPlane, faPlaneArrival, faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomSelect from "./CustomSelect";

const options =[
    {value: 'milano', label: 'Milano'},
    {value: 'barcelona', label: 'Barcelona'},
    {value: 'tiran', label: 'Tiran'},
]

export default function BookingCard(){
    return (
        <div className="bg-white p-4">
            <div>
                <h2 className="flex items-center gap-2 font-bold text-md"><FontAwesomeIcon icon={faPlane} className=" w-5" />BOOK YOUR FLIGHT</h2>
            </div> 
            <div className="flex gap-1 mt-6">
                <CustomSelect className="rounded-l-full" options={options} icon={faPlaneDeparture}/>
                <CustomSelect className="rounded-r-full" options={options} icon={faPlaneArrival}/>
            </div>
        </div>
    )
}
