export const tabs = [
  { id: "board", label: "Vista Tablero" },
  { id: "list", label: "Vista Lista" },
];

export const ticketsData = [
  {
    id: "ticket-1",
    title: "Configurar nuevo entorno de servidor",
    description:
      "Configurar el nuevo servidor cloud con las dependencias requeridas",
    priority: "high",
    status: "todo",
    assignee: "alex",
    comments: 3,
    aiResponded: true,
    created: "2025-03-25T10:30:00",
  },
  {
    id: "ticket-2",
    title: "Corregir bug de autenticación",
    description:
      "Los usuarios están experimentando problemas con el login social",
    priority: "critical",
    status: "todo",
    assignee: "maria",
    comments: 8,
    aiResponded: false,
    created: "2025-03-26T09:15:00",
  },
  {
    id: "ticket-3",
    title: "Actualizar pasarela de pago",
    description: "Integrar la nueva API del procesador de pagos",
    priority: "medium",
    status: "todo",
    assignee: "john",
    comments: 2,
    aiResponded: true,
    created: "2025-03-26T14:45:00",
  },
  {
    id: "ticket-4",
    title: "Optimizar consultas de base de datos",
    description: "Rendimiento lento en el dashboard de usuario",
    priority: "high",
    status: "inProgress",
    assignee: "alex",
    comments: 5,
    aiResponded: false,
    created: "2025-03-27T11:20:00",
  },
  {
    id: "ticket-5",
    title: "Implementar modo oscuro",
    description: "Añadir soporte para modo oscuro en toda la aplicación",
    priority: "low",
    status: "inProgress",
    assignee: "sarah",
    comments: 4,
    aiResponded: false,
    created: "2025-03-28T08:30:00",
  },
  {
    id: "ticket-6",
    title: "Revisar implementación de nueva funcionalidad",
    description: "Revisión de código para el sistema de notificaciones",
    priority: "medium",
    status: "review",
    assignee: "john",
    comments: 7,
    aiResponded: false,
    created: "2025-03-28T16:10:00",
  },
  {
    id: "ticket-7",
    title: "Actualizar documentación",
    description: "Actualizar documentación de API con nuevos endpoints",
    priority: "low",
    status: "done",
    assignee: "maria",
    comments: 1,
    aiResponded: true,
    created: "2025-03-29T09:45:00",
  },
  {
    id: "ticket-8",
    title: "Corregir responsividad móvil",
    description: "Solucionar problemas de UI en pantallas pequeñas",
    priority: "medium",
    status: "done",
    assignee: "sarah",
    comments: 3,
    aiResponded: false,
    created: "2025-03-29T13:20:00",
  },
];

export const users = {
  alex: { name: "Alex", avatar: "/placeholder.svg?height=32&width=32" },
  maria: { name: "Maria", avatar: "/placeholder.svg?height=32&width=32" },
  john: { name: "John", avatar: "/placeholder.svg?height=32&width=32" },
  sarah: { name: "Sarah", avatar: "/placeholder.svg?height=32&width=32" },
};

export const priorityColors = {
  low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  medium:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  high: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  critical: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

export const statusLabels = {
  todo: "Por Hacer",
  inProgress: "En Progreso",
  review: "Revisión",
  done: "Completado",
};

export const statusColors = {
  todo: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300",
  inProgress:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  review: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  done: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
};

export const initialColumns = {
  todo: {
    id: "todo",
    title: "Por Hacer",
    ticketIds: ["ticket-1", "ticket-2", "ticket-3"],
  },
  inProgress: {
    id: "inProgress",
    title: "En Progreso",
    ticketIds: ["ticket-4", "ticket-5"],
  },
  review: {
    id: "review",
    title: "Revisión",
    ticketIds: ["ticket-6"],
  },
  done: {
    id: "done",
    title: "Completado",
    ticketIds: ["ticket-7", "ticket-8"],
  },
};

export const API_URL = "http://localhost:8000"
