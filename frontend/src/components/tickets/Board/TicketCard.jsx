import { Draggable } from "@hello-pangea/dnd"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle } from "lucide-react"

/**
 * Componente que representa una tarjeta de ticket en un tablero.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.ticket - Objeto que contiene los datos del ticket.
 * @param {string} props.ticket.id - Identificador único del ticket.
 * @param {string} props.ticket.title - Título del ticket.
 * @param {string} props.ticket.description - Descripción del ticket.
 * @param {string} props.ticket.priority - Prioridad del ticket (low, medium, high, critical).
 * @param {string} props.ticket.assignee - ID del usuario asignado al ticket.
 * @param {boolean} props.ticket.aiResponded - Indica si la IA ha respondido al ticket.
 * @param {number} props.ticket.comments - Número de comentarios asociados al ticket.
 * @param {number} props.index - Índice del ticket en la lista.
 * @param {Object} props.priorityColors - Objeto que mapea prioridades a clases CSS para estilos.
 * @param {Object} props.users - Objeto que contiene información de los usuarios, mapeados por ID.
 * @param {Object} props.users[assigneeId] - Información del usuario asignado.
 * @param {string} props.users[assigneeId].avatar - URL del avatar del usuario.
 * @param {string} props.users[assigneeId].name - Nombre del usuario.
 *
 * @returns {JSX.Element} Componente de tarjeta de ticket.
 */
export default function TicketCard({ ticket, index, priorityColors, users }) {

    const getPriorityLabel = (priority) => {
        const labels = {
            low: "Baja",
            medium: "Media",
            high: "Alta",
            critical: "Crítica",
        }
        return labels[priority] || priority
    }


    return (
        <Draggable draggableId={ticket.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-white dark:bg-slate-800 rounded-md shadow p-3 border border-slate-200 dark:border-slate-700"
                >
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-sm">{ticket.title}</h3>
                        <Badge className={priorityColors[ticket.priority]}>
                            {getPriorityLabel(ticket.priority)}
                        </Badge>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{ticket.description}</p>
                    <div className="flex justify-between items-center">
                        <Avatar>
                            <AvatarImage src={users[ticket.assignee]?.avatar} />
                            <AvatarFallback>{users[ticket.assignee]?.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex space-x-2 text-xs text-slate-500 dark:text-slate-400">
                            {ticket.aiResponded && (
                                <Badge variant="outline" className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                    IA
                                </Badge>
                            )}
                            <div className="flex items-center">
                                <MessageCircle className="h-3 w-3 mr-1" />
                                {ticket.comments}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    )
}

