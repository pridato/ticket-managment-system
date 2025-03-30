import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

export default function CreateTicketButton({ onSuccess }) {
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [priority, setPriority] = useState("medium")
    const [assignee, setAssignee] = useState("")

    /**
     * Maneja el evento de envío del formulario.
     * 
     * @param {Object} e - El evento de envío del formulario.
     * @returns {void}
     */
    const handleSubmit = (e) => {
        e.preventDefault()
        setOpen(false)
        resetForm()
        onSuccess()
    }

    /**
     * Restablece los valores del formulario de creación de tickets a sus valores predeterminados.
     * 
     * @function
     * @description Establece el título, la descripción, la prioridad y el asignado a sus valores iniciales.
     */
    const resetForm = () => {
        setTitle("")
        setDescription("")
        setPriority("medium")
        setAssignee("")
    }

    return (
        <Dialog open={open} >
            <DialogTrigger asChild>
                <Button onClick={() => setOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Nuevo Ticket
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Crear Ticket</DialogTitle>
                    <DialogDescription>
                        Crea un nuevo ticket para tu proyecto.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Título ticket */}
                    <div className="grid gap-2">
                        <label htmlFor="title" className="text-sm font-medium">
                            Título
                        </label>
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ingresa el título del ticket" />
                    </div>

                    {/* Descripción ticket */}
                    <div className="grid gap-2">
                        <label htmlFor="description" className="text-sm font-medium">
                            Descripción
                        </label>
                        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Ingresa la descripción del ticket" />
                    </div>

                    {/* Prioridad ticket */}
                    <div className="grid gap-2">
                        <label htmlFor="priority" className="text-sm font-medium">
                            Prioridad
                        </label>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Selecciona la prioridad" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel className="text-sm font-medium">
                                        Prioridad
                                    </SelectLabel>
                                    <SelectItem value="low">Baja</SelectItem>
                                    <SelectItem value="medium">Media</SelectItem>
                                    <SelectItem value="high">Alta</SelectItem>
                                    <SelectItem value="urgent">Urgente</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Asignado a */}
                    <div className="grid gap-2">
                        <label htmlFor="assignee" className="text-sm font-medium">
                            Asignar a
                        </label>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Selecciona un usuario" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel className="text-sm font-medium">
                                        Usuarios
                                    </SelectLabel>
                                    <SelectItem value="user1">Usuario 1</SelectItem>
                                    <SelectItem value="user2">Usuario 2</SelectItem>
                                    <SelectItem value="user3">Usuario 3</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </form>
                <DialogFooter>
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" onClick={handleSubmit}>Crear Ticket</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}