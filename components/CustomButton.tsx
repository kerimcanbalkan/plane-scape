import { useState } from "react";


type Props = {
    className?: string;
    text: string;
    theme?: "primary" | "secondary"
};

export default function CustomButton({className="", text, theme="primary"}:Props){
    return (
    <button className={`${className} p-2 text-bold text-sm rounded-md ${theme == "primary" ? "bg-primary text-white" : "bg-secondary text-primary"}`}>{text}</button>
    );
}
