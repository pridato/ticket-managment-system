import apiClient from "./api-client";

/**
 * Servicio para la gestión de tickets en el sistema.
 * Proporciona métodos para realizar operaciones CRUD, asignar tickets,
 * gestionar comentarios, subir archivos adjuntos y obtener estadísticas.
 * Métodos disponibles:
 * 
 * - getTickets(options): Obtiene todos los tickets con opciones de filtrado y paginación.
 * - getTicketById(id): Obtiene un ticket por su ID.
 * - createTicket(ticketData): Crea un nuevo ticket.
 * - updateTicket(id, ticketData): Actualiza un ticket existente.
 * - updateTicketStatus(id, status): Actualiza el estado de un ticket.
 * - assignTicket(id, userId): Asigna un ticket a un usuario.
 * - deleteTicket(id): Elimina un ticket.
 * - getTicketComments(id): Obtiene comentarios de un ticket.
 * - addComment(id, content): Añade un comentario a un ticket.
 * - getTicketStats(): Obtiene estadísticas de tickets.
 * - uploadAttachments(id, formData): Sube archivos adjuntos a un ticket.
 * 
 */
const ticketService = {
    /**
     * Obtiene todos los tickets con opciones de filtrado y paginación.
     * @param {Object} options - Opciones de filtrado y paginación.
     * @param {string} [options.status] - Estado del ticket.
     * @param {string} [options.priority] - Prioridad del ticket.
     * @param {string} [options.assignee] - Usuario asignado al ticket.
     * @param {string} [options.search] - Término de búsqueda.
     * @param {number} [options.page=1] - Número de página.
     * @param {number} [options.limit=10] - Límite de tickets por página.
     * @param {string} [options.sort] - Orden de los tickets.
     * @returns {Promise<Object>} - Lista de tickets y metadatos.
     */
    async getTickets(options = {}) {
        const { status, priority, assignee, search, page = 1, limit = 10, sort } = options;

        // Construir query params
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        if (priority) params.append("priority", priority);
        if (assignee) params.append("assignee", assignee);
        if (search) params.append("search", search);
        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());
        if (sort) params.append("sort", sort);

        const queryString = params.toString() ? `?${params.toString()}` : "";
        return apiClient.get(`/tickets${queryString}`);
    },

    /**
     * Obtiene un ticket por su ID.
     * @param {string} id - ID del ticket.
     * @returns {Promise<Object>} - Datos del ticket.
     */
    async getTicketById(id) {
        return apiClient.get(`/tickets/${id}`);
    },

    /**
     * Crea un nuevo ticket.
     * @param {Object} ticketData - Datos del ticket a crear.
     * @returns {Promise<Object>} - Ticket creado.
     */
    async createTicket(ticketData) {
        return apiClient.post("/tickets", ticketData);
    },

    /**
     * Actualiza un ticket existente.
     * @param {string} id - ID del ticket.
     * @param {Object} ticketData - Datos a actualizar.
     * @returns {Promise<Object>} - Ticket actualizado.
     */
    async updateTicket(id, ticketData) {
        return apiClient.put(`/tickets/${id}`, ticketData);
    },

    /**
     * Actualiza el estado de un ticket.
     * @param {string} id - ID del ticket.
     * @param {string} status - Nuevo estado.
     * @returns {Promise<Object>} - Ticket actualizado.
     */
    async updateTicketStatus(id, status) {
        return apiClient.patch(`/tickets/${id}/status`, { status });
    },

    /**
     * Asigna un ticket a un usuario.
     * @param {string} id - ID del ticket.
     * @param {string} userId - ID del usuario asignado.
     * @returns {Promise<Object>} - Ticket actualizado.
     */
    async assignTicket(id, userId) {
        return apiClient.patch(`/tickets/${id}/assign`, { assignee: userId });
    },

    /**
     * Elimina un ticket.
     * @param {string} id - ID del ticket.
     * @returns {Promise<Object>} - Respuesta de confirmación.
     */
    async deleteTicket(id) {
        return apiClient.delete(`/tickets/${id}`);
    },

    /**
     * Obtiene comentarios de un ticket.
     * @param {string} id - ID del ticket.
     * @returns {Promise<Array>} - Lista de comentarios.
     */
    async getTicketComments(id) {
        return apiClient.get(`/tickets/${id}/comments`);
    },

    /**
     * Añade un comentario a un ticket.
     * @param {string} id - ID del ticket.
     * @param {string} content - Contenido del comentario.
     * @returns {Promise<Object>} - Comentario creado.
     */
    async addComment(id, content) {
        return apiClient.post(`/tickets/${id}/comments`, { content });
    },

    /**
     * Obtiene estadísticas de tickets.
     * @returns {Promise<Object>} - Estadísticas de tickets.
     */
    async getTicketStats() {
        return apiClient.get("/tickets/stats");
    },

    /**
     * Sube archivos adjuntos a un ticket.
     * @param {string} id - ID del ticket.
     * @param {FormData} formData - FormData con los archivos.
     * @returns {Promise<Object>} - Información de los archivos subidos.
     */
    async uploadAttachments(id, formData) {
        return apiClient.upload(`/tickets/${id}/attachments`, formData);
    },
};

export default ticketService;

