import { API_URL } from "@/constants";
import axios from "axios";

/**
 * Cliente API base para realizar peticiones HTTP
 * Configura headers comunes, manejo de errores y tokens de autenticación
 */

/**
 * Obtiene el token de autenticación almacenado en el localStorage.
 *
 * @returns {string|null} El token de autenticación si existe, o null si no está disponible.
 */
const getAuthToken = () => {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem("auth_token");
  }
  return null;
};

/**
 * Genera los encabezados HTTP para una solicitud, incluyendo encabezados personalizados
 * y un token de autorización si está disponible.
 *
 * @param {Object} [customHeaders={}] - Encabezados personalizados que se agregarán a los predeterminados.
 * @returns {Object} - Un objeto que contiene los encabezados HTTP configurados.
 */
const getHeaders = (customHeaders = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...customHeaders,
  };

  const token = getAuthToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Maneja la respuesta de una solicitud HTTP, procesando el cuerpo JSON y gestionando errores.
 *
 * @async
 * @function
 * @param {Response} response - Objeto de respuesta de la API.
 * @throws {Object} Lanza un objeto de error si la respuesta no es exitosa (response.ok es false).
 * @throws {number} error.status - Código de estado HTTP de la respuesta.
 * @throws {string} error.message - Mensaje de error proporcionado por el servidor o el texto del estado HTTP.
 * @throws {Object} [error.errors] - Detalles adicionales de errores proporcionados por el servidor.
 * @throws {Object} error.data - Datos devueltos por el servidor, incluso en caso de error.
 * @returns {Promise<Object>} Devuelve una promesa que resuelve con los datos JSON de la respuesta si es exitosa.
 */
const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    // Manejo específico de errores según el código de estado
    if (response.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem("auth_token");
      // Redirigir a login o mostrar mensaje
      window.location.href = "/login";
    }

    throw {
      status: response.status,
      message: data.message || response.statusText,
      errors: data.errors,
      data,
    };
  }

  return data;
};

/**
 * Cliente HTTP para realizar peticiones a la API
 */
const apiClient = {
  /**
   * Realiza una petición GET
   * @param {string} endpoint - Ruta del endpoint
   * @param {Object} options - Opciones adicionales para fetch
   */
  async get(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;
    const response = await fetch(url, {
      method: "GET",
      headers: getHeaders(options.headers),
      ...options,
    });

    return handleResponse(response);
  },

  /**
   * Realiza una petición POST
   * @param {string} endpoint - Ruta del endpoint
   * @param {Object} data - Datos a enviar en el cuerpo de la petición
   * @param {Object} options - Opciones adicionales para fetch
   */
  async post(endpoint, data, options = {}) {
    const url = `${API_URL}${endpoint}`;

    try {
      const response = await axios.post(url, data, {
        headers: getHeaders(options.headers),
        ...options,
      });
      return handleResponse(response);
    } catch (error) {
      if (error.response) {
        // La solicitud se realizó y el servidor respondió con un código de estado
        // que cae fuera del rango de 2xx
        const { status, data } = error.response;
        throw {
          status,
          message: data.message || error.message,
          errors: data.errors,
          data,
        };
      }
    }
  },

  /**
   * Realiza una petición PUT
   * @param {string} endpoint - Ruta del endpoint
   * @param {Object} data - Datos a enviar en el cuerpo de la petición
   * @param {Object} options - Opciones adicionales para fetch
   */
  async put(endpoint, data, options = {}) {
    const url = `${API_URL}${endpoint}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: getHeaders(options.headers),
      body: JSON.stringify(data),
      ...options,
    });

    return handleResponse(response);
  },

  /**
   * Realiza una petición PATCH
   * @param {string} endpoint - Ruta del endpoint
   * @param {Object} data - Datos a enviar en el cuerpo de la petición
   * @param {Object} options - Opciones adicionales para fetch
   */
  async patch(endpoint, data, options = {}) {
    const url = `${API_URL}${endpoint}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: getHeaders(options.headers),
      body: JSON.stringify(data),
      ...options,
    });

    return handleResponse(response);
  },

  /**
   * Realiza una petición DELETE
   * @param {string} endpoint - Ruta del endpoint
   * @param {Object} options - Opciones adicionales para fetch
   */
  async delete(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: getHeaders(options.headers),
      ...options,
    });

    return handleResponse(response);
  },

  /**
   * Sube archivos mediante FormData
   * @param {string} endpoint - Ruta del endpoint
   * @param {FormData} formData - Objeto FormData con los archivos y datos
   * @param {Object} options - Opciones adicionales para fetch
   */
  async upload(endpoint, formData, options = {}) {
    const url = `${API_URL}${endpoint}`;
    // No incluimos Content-Type para que el navegador establezca el boundary correcto
    const headers = getHeaders();
    delete headers["Content-Type"];

    const response = await fetch(url, {
      method: "POST",
      headers: {
        ...headers,
        ...options.headers,
      },
      body: formData,
      ...options,
    });

    return handleResponse(response);
  },
};

export default apiClient;
