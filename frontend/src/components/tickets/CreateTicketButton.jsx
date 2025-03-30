import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

export default function CreateTicketButton({ onSuccess }) {
    const [open, setOpen] = useState(false)

    return ( 
        <>
            <Button onClick={() => setOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Ticket
            </Button>
        </>
    )
}