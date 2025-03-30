import { Search, Filter } from "lucide-react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import TicketTable from "./TicketTable";
import { useState } from "react";
import { priorityColors, statusColors, statusLabels, ticketsData, users } from "@/constants";

export default function TicketList() {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: "created", direction: "desc" });
    const [tickets, setTickets] = useState(ticketsData)

    /**
    * Ordena una lista de tickets basada en una clave y dirección de ordenamiento especificadas.
    *
    * @constant {Array} sortedTickets - Una copia ordenada de la lista original de tickets.
    * @param {Array} tickets - La lista original de tickets a ordenar.
    * @param {Object} sortConfig - Configuración de ordenamiento.
    * @param {string} sortConfig.key - La clave del ticket por la cual se realizará el ordenamiento.
    * @param {string} sortConfig.direction - La dirección del ordenamiento, puede ser "asc" para ascendente o "desc" para descendente.
    * @returns {Array} Una nueva lista de tickets ordenada según la configuración proporcionada.
    */
    const sortedTickets = [...tickets].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "asc" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "asc" ? 1 : -1
        }
        return 0
    })

    /**
     * Filtra los tickets ordenados en función de la consulta de búsqueda.
     * Un ticket se incluye en la lista filtrada si su título o descripción
     * contiene la consulta de búsqueda (sin distinguir entre mayúsculas y minúsculas).
     *
     * @constant
     * @type {Array<Object>}
     * @property {string} ticket.title - El título del ticket.
     * @property {string} ticket.description - La descripción del ticket.
     * @returns {Array<Object>} Un array de tickets que coinciden con la consulta de búsqueda.
     */
    const filteredTickets = sortedTickets.filter(
        (ticket) =>
            ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ticket.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    /**
     * Maneja la lógica de ordenamiento para una lista de elementos.
     * Cambia la dirección de ordenamiento entre ascendente ("asc") y descendente ("desc")
     * según la clave proporcionada y el estado actual de la configuración de ordenamiento.
     *
     * @param {string} key - La clave por la cual se debe ordenar la lista.
     */
    const handleSort = (key) => {
        let direction = "asc"
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc"
        }
        setSortConfig({ key, direction })
    }

    /**
     * Formatea una cadena de fecha en un formato legible según la configuración regional "es-ES".
     *
     * @param {string} dateString - La cadena de fecha que se desea formatear.
     * @returns {string} - La fecha formateada en el formato "mes día, hora:minuto".
     */
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat("es-ES", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date)
    }

    /**
     * Devuelve la etiqueta correspondiente a un nivel de prioridad dado.
     *
     * @param {string} priority - El nivel de prioridad (por ejemplo, "low", "medium", "high", "critical").
     * @returns {string} La etiqueta en español correspondiente al nivel de prioridad, 
     * o el valor original si no coincide con ninguna clave.
     */
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
        <div className="bg-white dark:bg-slate-800 rounded-md shadow">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-3 justify-between">
                {/* contenedor input search*/}
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Buscar tickets..."
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-8 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtrar
                </Button>
            </div>

            <div className="overflow-x-auto">
                <TicketTable
                    filteredTickets={filteredTickets}
                    sortConfig={sortConfig}
                    handleSort={handleSort} priorityColors={priorityColors}
                    statusColors={statusColors}
                    users={users}
                    formatDate={formatDate}
                    getPriorityLabel={getPriorityLabel}
                    statusLabels={statusLabels}
                />
            </div>
        </div>
    );
}
