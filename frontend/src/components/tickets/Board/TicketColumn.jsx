import { Droppable } from "@hello-pangea/dnd"
import TicketCard from "./TicketCard"
import { Badge } from "@/components/ui/badge"

/**
 * Componente que representa una columna de tickets en un tablero.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.column - Objeto que representa la columna, contiene información como el título y los IDs de los tickets.
 * @param {Object} props.tickets - Objeto que contiene los tickets, donde las claves son los IDs de los tickets y los valores son los datos de cada ticket.
 * @param {Object} props.priorityColors - Objeto que mapea los niveles de prioridad a sus colores correspondientes.
 * @param {Object} props.users - Objeto que contiene información sobre los usuarios asignados a los tickets.
 *
 * @returns {JSX.Element} Un componente que muestra una columna con sus tickets correspondientes.
 */
export default function TicketColumn({ column, tickets, priorityColors, users }) {
    return (
        <div key={column.id} className="bg-gray-100 rounded-lg p-4 min-h-[500px]">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-full">
                <div className="flex flex-col space-y-1.5 p-6 pb-2">
                    <div className="text-md font-medium flex justify-between">
                        <span>{column.title}</span>
                        <Badge variant="outline">{column.ticketIds.length}</Badge>
                    </div>

                    <Droppable droppableId={column.id}>
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3 min-h-[400px]">
                                {column.ticketIds.map((ticketId, index) => {
                                    const ticket = tickets[ticketId]
                                    return <TicketCard key={ticket.id} ticket={ticket} index={index} priorityColors={priorityColors} users={users} />
                                })}
                            </div>
                        )}
                    </Droppable>
                </div>
            </div>
        </div>
    )
}
