import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface Props {
    href: string;
    className?: string;
    img?: string;
    text: string;
    icon?: IconDefinition;
}

export default function NavigationCard({ href, className = "", img, text, icon }: Props) {
    return (
        <Link
            href={href}
            className={`w-full bg-primary rounded-lg h-3/6 p-4 flex items-end ${className} ${!img ? "bg-primary" : ""}`}
            style={img ? { backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
        >

            <div>
                {icon && <FontAwesomeIcon icon={icon} className="text-white text-xl" />}
                <h1 className="text-white text-xl">{text}</h1>
            </div>
        </Link>
    );
}

