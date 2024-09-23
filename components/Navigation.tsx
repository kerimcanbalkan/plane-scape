import Link from "next/link"
import Logo from "@/components/Logo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser, faGlobe, faTag } from "@fortawesome/free-solid-svg-icons"

export default function Navigation(){
    return (
        <div className="p-3 flex justify-between">
           <Link href="/"><Logo/></Link> 
            <ul className="flex gap-3 items-center">
                <Link href="#Deals"><li className="flex items-center gap-2"><FontAwesomeIcon icon={faTag} className="text-primary" /> Deals</li></Link>
                <Link href="#Discover"><li className="flex items-center gap-2"><FontAwesomeIcon icon={faGlobe} className="text-primary" /> Discover</li></Link>
                <Link href="#Profile"><li className="flex items-center gap-2"><FontAwesomeIcon icon={faCircleUser} className="text-primary text-2xl" />Jon Doe</li></Link>
            </ul>
        </div>
    )
}
