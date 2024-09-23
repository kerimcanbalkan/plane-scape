'use client';

import { useState } from "react";
import CustomButton from "./CustomButton";

interface Props {
    className?: string,
    text: string,
    open: boolean,
    setOpen: (value: boolean) => void; // Add this prop to control modal visibility
}

export default function WarningModal({ text, className = "", open, setOpen }: Props) {
    const handleClose = () => {
        setOpen(false); // Close the modal using the provided setter
    }

    return (
        <div className={`${open ? "fixed inset-0 flex items-center justify-center" : "hidden"} z-50`}>
            <div className={`bg-white p-6 rounded shadow-lg max-w-md mx-auto text-center ${className}`}>
                <h1 className="text-lg font-semibold mb-4">{text}</h1>
                <CustomButton
                    type="button"
                    text="Close"
                    onClick={handleClose}
                    className="w-2/4 text-white py-2"
                />
            </div>
        </div>
    );
}

