import { Badge } from "@/components/ui/badge";
import { Button } from "../../ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ChevronDown,
  ChevronUp,
  MessageCircle,
  MoreHorizontal,
} from "lucide-react";

/**
 * Componente que renderiza una tabla de tickets con funcionalidades de ordenamiento y visualización de detalles.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Array} props.filteredTickets - Lista de tickets filtrados que se mostrarán en la tabla.
 * @param {Object} props.sortConfig - Configuración actual de ordenamiento, incluyendo la clave y la dirección.
 * @param {Function} props.handleSort - Función para manejar el ordenamiento de las columnas.
 * @param {Object} props.priorityColors - Mapeo de prioridades a clases de colores CSS.
 * @param {Object} props.statusColors - Mapeo de estados a clases de colores CSS.
 * @param {Object} props.users - Objeto que contiene información de los usuarios, incluyendo avatar y nombre.
 * @param {Function} props.formatDate - Función para formatear fechas en un formato legible.
 * @param {Function} props.getPriorityLabel - Función para obtener la etiqueta de texto de una prioridad.
 * @param {Object} props.statusLabels - Mapeo de estados a etiquetas de texto.
 *
 * @returns {JSX.Element} Tabla de tickets con columnas ordenables y opciones de interacción.
 */
export default function TicketTable({
  filteredTickets,
  sortConfig,
  handleSort,
  priorityColors,
  statusColors,
  users,
  formatDate,
  getPriorityLabel,
  statusLabels,
}) {
  return (
    <table className="w-full table-auto text-sm">
      <thead className="bg-muted text-muted-foreground">
        <tr className="transition-colors hover:bg-muted/50">
          <th className="h-12 px-4 text-left font-medium">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => handleSort("title")}
            >
              Ticket
              {sortConfig.key === "title" &&
                (sortConfig.direction === "asc" ? (
                  <ChevronUp className="ml-1 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-1 h-4 w-4" />
                ))}
            </div>
          </th>
          <th className="h-12 px-4 text-left font-medium">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => handleSort("priority")}
            >
              Prioridad
              {sortConfig.key === "priority" &&
                (sortConfig.direction === "asc" ? (
                  <ChevronUp className="ml-1 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-1 h-4 w-4" />
                ))}
            </div>
          </th>
          <th className="h-12 px-4 text-left font-medium">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => handleSort("status")}
            >
              Estado
              {sortConfig.key === "status" &&
                (sortConfig.direction === "asc" ? (
                  <ChevronUp className="ml-1 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-1 h-4 w-4" />
                ))}
            </div>
          </th>
          <th className="h-12 px-4 text-left font-medium">Asignado a</th>
          <th className="h-12 px-4 text-left font-medium">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => handleSort("created")}
            >
              Creado
              {sortConfig.key === "created" &&
                (sortConfig.direction === "asc" ? (
                  <ChevronUp className="ml-1 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-1 h-4 w-4" />
                ))}
            </div>
          </th>
          <th className="h-12 px-4 text-left font-medium"></th>
        </tr>
      </thead>
      <tbody>
        {filteredTickets.map((ticket) => (
          <tr key={ticket.id} className="transition-colors hover:bg-muted/50">
            <td className="p-4">
              <div>
                <div className="font-medium">{ticket.title}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {ticket.description}
                </div>
                {ticket.aiResponded && (
                  <Badge
                    variant="outline"
                    className="text-xs mt-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  >
                    Respondido por IA
                  </Badge>
                )}
              </div>
            </td>
            <td className="p-4">
              <Badge className={priorityColors[ticket.priority]}>
                {getPriorityLabel(ticket.priority)}
              </Badge>
            </td>
            <td className="p-4">
              <Badge className={statusColors[ticket.status]}>
                {statusLabels[ticket.status]}
              </Badge>
            </td>
            <td className="p-4">
              <div className="flex items-center">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={users[ticket.assignee].avatar} />
                  <AvatarFallback>{users[ticket.assignee].name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{users[ticket.assignee].name}</span>
              </div>
            </td>
            <td className="p-4 text-sm text-slate-500 dark:text-slate-400">
              {formatDate(ticket.created)}
            </td>
            <td className="p-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                  <MessageCircle className="h-3 w-3 mr-1" />
                  {ticket.comments}
                </div>
                <DropdownMenu
                  trigger={
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  }
                  items={[
                    { label: "Ver detalles", action: () => { } },
                    { label: "Editar ticket", action: () => { } },
                    { label: "Cambiar estado", action: () => { } },
                    { label: "Reasignar", action: () => { } },
                  ]}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
