import { MouseEventHandler } from "react";

type Props = {
    className?: string;
    text: string;
    theme?: "primary" | "secondary";
    type?: "button" | "submit" | "reset";
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function CustomButton({
    className = "",
    text,
    theme = "primary",
    type = "submit",
    onClick
}: Props) {
    return (
        <button
            type={type}
            className={`${className} p-2 font-bold text-sm rounded-md ${theme === "primary" ? "bg-primary text-white" : "bg-secondary text-primary"}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
}

