import { useState } from "react";

export function useAuthAlert() { 
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [alertDescription, setAlertDescription] = useState("");

    const triggerAlert = (title: string, description: string) => {
        setAlertTitle(title);
        setAlertDescription(description);
        setIsAlertOpen(true);
    }

    return {
        isAlertOpen,
        alertTitle,
        alertDescription,
        triggerAlert,
        setIsAlertOpen,
    }
}