import apiClient from "./api-client"


/**
 * Servicio para la gestión de usuarios.
 * Proporciona métodos para interactuar con la API relacionados con usuarios.
 * 
 * Métodos disponibles:
 * - `getUsers(options)`: Obtiene todos los usuarios con opciones de filtrado y paginación.
 * - `getUserById(id)`: Obtiene un usuario por su ID.
 * - `getProfile()`: Obtiene el perfil del usuario actual.
 * - `updateProfile(profileData)`: Actualiza el perfil del usuario actual.
 * - `changePassword(currentPassword, newPassword)`: Cambia la contraseña del usuario actual.
 * - `updateUser(id, userData)`: Actualiza un usuario (solo admin).
 * - `changeUserRole(id, role)`: Cambia el rol de un usuario (solo admin).
 * - `deactivateUser(id)`: Desactiva un usuario (solo admin).
 * - `activateUser(id)`: Activa un usuario (solo admin).
 * - `uploadAvatar(formData)`: Sube el avatar del usuario.
 */
const userService = {
  /**
   * Obtiene todos los usuarios con opciones de filtrado y paginación
   * @param {Object} options - Opciones de filtrado y paginación
   * @returns {Promise<Object>} - Lista de usuarios y metadatos
   */
  async getUsers(options = {}) {
    const { role, search, page = 1, limit = 10, sort } = options

    // Construir query params
    const params = new URLSearchParams()
    if (role) params.append("role", role)
    if (search) params.append("search", search)
    if (page) params.append("page", page.toString())
    if (limit) params.append("limit", limit.toString())
    if (sort) params.append("sort", sort)

    const queryString = params.toString() ? `?${params.toString()}` : ""
    return apiClient.get(`/users${queryString}`)
  },

  /**
   * Obtiene un usuario por su ID
   * @param {string} id - ID del usuario
   * @returns {Promise<Object>} - Datos del usuario
   */
  async getUserById(id) {
    return apiClient.get(`/users/${id}`)
  },

  /**
   * Obtiene el perfil del usuario actual
   * @returns {Promise<Object>} - Datos del perfil
   */
  async getProfile() {
    return apiClient.get("/users/profile")
  },

  /**
   * Actualiza el perfil del usuario actual
   * @param {Object} profileData - Datos a actualizar
   * @returns {Promise<Object>} - Perfil actualizado
   */
  async updateProfile(profileData) {
    return apiClient.put("/users/profile", profileData)
  },

  /**
   * Cambia la contraseña del usuario actual
   * @param {string} currentPassword - Contraseña actual
   * @param {string} newPassword - Nueva contraseña
   * @returns {Promise<Object>} - Respuesta de confirmación
   */
  async changePassword(currentPassword, newPassword) {
    return apiClient.post("/users/change-password", {
      currentPassword,
      newPassword,
    })
  },

  /**
   * Actualiza un usuario (solo admin)
   * @param {string} id - ID del usuario
   * @param {Object} userData - Datos a actualizar
   * @returns {Promise<Object>} - Usuario actualizado
   */
  async updateUser(id, userData) {
    return apiClient.put(`/users/${id}`, userData)
  },

  /**
   * Cambia el rol de un usuario (solo admin)
   * @param {string} id - ID del usuario
   * @param {string} role - Nuevo rol
   * @returns {Promise<Object>} - Usuario actualizado
   */
  async changeUserRole(id, role) {
    return apiClient.patch(`/users/${id}/role`, { role })
  },

  /**
   * Desactiva un usuario (solo admin)
   * @param {string} id - ID del usuario
   * @returns {Promise<Object>} - Respuesta de confirmación
   */
  async deactivateUser(id) {
    return apiClient.patch(`/users/${id}/status`, { active: false })
  },

  /**
   * Activa un usuario (solo admin)
   * @param {string} id - ID del usuario
   * @returns {Promise<Object>} - Respuesta de confirmación
   */
  async activateUser(id) {
    return apiClient.patch(`/users/${id}/status`, { active: true })
  },

  /**
   * Sube avatar del usuario
   * @param {FormData} formData - FormData con la imagen
   * @returns {Promise<Object>} - Información de la imagen subida
   */
  async uploadAvatar(formData) {
    return apiClient.upload("/users/avatar", formData)
  },
}

export default userService
