import { DragDropContext } from "@hello-pangea/dnd"
import { useEffect, useState } from "react"
import { initialColumns, ticketsData, users, priorityColors } from "@/constants"
import TicketColumn from "./TicketColumn"

/**
 * Componente principal del tablero de tickets que permite la gestión de columnas y tickets
 * mediante la funcionalidad de arrastrar y soltar (drag-and-drop).
 *
 * @component
 *
 * @returns {JSX.Element} El componente del tablero de tickets.
 *
 * @description
 * Este componente utiliza `react-beautiful-dnd` para implementar la funcionalidad
 * de arrastrar y soltar. Permite reorganizar los tickets dentro de una columna
 * o moverlos entre diferentes columnas. El estado de las columnas y los tickets
 * se maneja localmente utilizando `useState`.
 *
 * @function onDragEnd
 * @param {Object} result - Resultado del evento de arrastrar y soltar.
 * @param {Object} result.destination - Destino del elemento arrastrado.
 * @param {string} result.destination.droppableId - ID de la columna de destino.
 * @param {number} result.destination.index - Índice en la columna de destino.
 * @param {Object} result.source - Origen del elemento arrastrado.
 * @param {string} result.source.droppableId - ID de la columna de origen.
 * @param {number} result.source.index - Índice en la columna de origen.
 * @param {string} result.draggableId - ID del ticket arrastrado.
 *
 * @example
 * // Ejemplo de uso:
 * <TicketBoard />
 *
 * @dependencies
 * - `react-beautiful-dnd` para la funcionalidad de drag-and-drop.
 * - `useState` para manejar el estado local de columnas y tickets.
 */
export default function TicketBoard() {
    const [columns, setColumns] = useState(initialColumns)
    const [tickets, setTickets] = useState(ticketsData)

    /**
     * Maneja el evento de arrastrar y soltar para reorganizar tickets dentro de columnas
     * o moverlos entre columnas en un tablero.
     *
     * @param {Object} result - Objeto que contiene información sobre el evento de arrastrar y soltar.
     * @param {Object} result.destination - El destino donde se soltó el elemento.
     * @param {string} result.destination.droppableId - ID de la columna de destino.
     * @param {number} result.destination.index - Índice dentro de la columna de destino.
     * @param {Object} result.source - El origen desde donde se arrastró el elemento.
     * @param {string} result.source.droppableId - ID de la columna de origen.
     * @param {number} result.source.index - Índice dentro de la columna de origen.
     * @param {string} result.draggableId - ID del elemento arrastrado.
     *
     * @returns {void} - No retorna ningún valor.
     */
    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result

        if (!destination) return
        if (destination.droppableId === source.droppableId && destination.index === source.index) return

        const startColumn = columns[source.droppableId]
        const endColumn = columns[destination.droppableId]

        if (startColumn === endColumn) {
            const newTicketIds = Array.from(startColumn.ticketIds)
            newTicketIds.splice(source.index, 1)
            newTicketIds.splice(destination.index, 0, draggableId)

            const newColumn = {
                ...startColumn,
                ticketIds: newTicketIds,
            }

            setColumns({ ...columns, [newColumn.id]: newColumn })
            return
        }

        const startTicketIds = Array.from(startColumn.ticketIds)
        startTicketIds.splice(source.index, 1)
        const newStartColumn = { ...startColumn, ticketIds: startTicketIds }

        const endTicketIds = Array.from(endColumn.ticketIds)
        endTicketIds.splice(destination.index, 0, draggableId)
        const newEndColumn = { ...endColumn, ticketIds: endTicketIds }

        setColumns({
            ...columns,
            [newStartColumn.id]: newStartColumn,
            [newEndColumn.id]: newEndColumn,
        })
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Object.values(columns).map((column) => (
                    <TicketColumn key={column.id} column={column} tickets={tickets} priorityColors={priorityColors} users={users} />
                ))}
            </div>
        </DragDropContext>
    )
}
