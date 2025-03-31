import apiClient from "./api-client";

/**
 * Servicio de autenticación para gestionar el inicio de sesión, registro, 
 * cierre de sesión, restablecimiento de contraseña y manejo de tokens.
 * 
 * Métodos disponibles:
 * 
 * - login(email, password): Inicia sesión con email y contraseña.
 * - register(userData): Registra un nuevo usuario.
 * - logout(): Cierra la sesión del usuario actual.
 * - forgotPassword(email): Solicita el restablecimiento de contraseña.
 * - resetPassword(token, newPassword): Restablece la contraseña con un token de verificación.
 * - isAuthenticated(): Verifica si el usuario está autenticado.
 * - getCurrentUser(): Obtiene los datos del usuario actual.
 * - updateUserData(userData): Actualiza los datos del usuario en el almacenamiento local.
 * - refreshToken(): Verifica y refresca el token si es necesario.
 */
const authService = {
  /**
   * Inicia sesión con email y contraseña
   * @param {string} email - Correo electrónico del usuario
   * @param {string} password - Contraseña del usuario
   * @returns {Promise<Object>} - Datos del usuario y token
   */
  async login(email, password) {
    try {
      const response = await apiClient.post("/auth/login", { email, password });

      // Guardar token en localStorage si existe junto con el usuario
      if (response.token) {
        localStorage.setItem("auth_token", response.token);

        if (response.user) {
          localStorage.setItem("user", JSON.stringify(response.user));
        }
      }

      return response;
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  },

  /**
   * Registra un nuevo usuario
   * @param {Object} userData - Datos del usuario a registrar
   * @returns {Promise<Object>} - Datos del usuario registrado
   */
  async register(userData) {
    try {
      const response = await apiClient.post("/auth/register", userData);

      // iniciar sesión automáticamente después del registro
      if (response.token) {
        localStorage.setItem("auth_token", response.token);
        if (response.user) {
          localStorage.setItem("user", JSON.stringify(response.user));
        }
      }

      return response;
    } catch (error) {
      console.error("Error en registro:", error);
      throw error;
    }
  },

  /**
   * Cierra la sesión del usuario actual
   */
  async logout() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
  },

  /**
   * Solicita restablecimiento de contraseña
   * @param {string} email - Correo electrónico del usuario
   */
  async forgotPassword(email) {
    return apiClient.post("/auth/forgot-password", { email });
  },

  /**
   * Restablece la contraseña con token de verificación
   * @param {string} token - Token de verificación
   * @param {string} newPassword - Nueva contraseña
   */
  async resetPassword(token, newPassword) {
    return apiClient.post("/auth/reset-password", {
      token,
      password: newPassword,
    });
  },

  /**
   * Verifica si el usuario está autenticado
   * @returns {boolean} - Estado de autenticación
   */
  isAuthenticated() {
    return !!localStorage.getItem("auth_token");
  },

  /**
   * Obtiene los datos del usuario actual
   * @returns {Object|null} - Datos del usuario o null
   */
  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        return null;
      }
    }
    return null;
  },

  /**
   * Actualiza los datos del usuario en el almacenamiento local
   * @param {Object} userData - Nuevos datos del usuario
   */
  updateUserData(userData) {
    const currentUser = this.getCurrentUser()
    if (currentUser) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...currentUser,
          ...userData,
        }),
      )
    }
  },

  /**
   * Verifica y refresca el token si es necesario
   */
  async refreshToken() {
    try {
      const response = await apiClient.post("/auth/refresh-token", {})
      if (response.token) {
        localStorage.setItem("auth_token", response.token)
      }
      return response
    } catch (error) {
      console.error("Error al refrescar token:", error)
      // Si falla, cerrar sesión
      this.logout()
      throw error
    }
  },
};

export default authService
