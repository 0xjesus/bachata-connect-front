// composables/useApiFetch.js - ARREGLADO
export const useApiFetch = (endpoint, options = {}) => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();

  // Construir headers dinámicamente
  const getHeaders = () => {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Agregar token si existe
    if (authStore.token) {
      headers.Authorization = `Bearer ${authStore.token}`;
    }

    return headers;
  };

  const defaults = {
    baseURL: config.public.apiBase,
    headers: getHeaders(),

    // 🔥 ARREGLO: Interceptor más inteligente para errores de respuesta
    onResponseError({ response }) {
      console.error(`API Error [${response.status}]:`, response._data);

      // Solo hacer logout en casos MUY específicos
      if (response.status === 401) {
        const errorMessage = response._data?.message || '';
        const isTokenError = errorMessage.toLowerCase().includes('token') ||
                           errorMessage.toLowerCase().includes('unauthorized') ||
                           errorMessage.toLowerCase().includes('expired');

        // Solo logout si es realmente un problema de token
        if (isTokenError) {
          console.error('🚨 Token invalid/expired - logging out');
          authStore.logout();
        } else {
          console.warn('⚠️ 401 error but not token related:', errorMessage);
        }
      }

      // Para otros errores (400, 403, 404, 500, etc.) NO hacer logout
      // Dejar que el componente maneje el error
    },

    // Interceptor para errores de request
    onRequestError({ error }) {
      console.error('🚨 Request Error:', error);
      // NO hacer logout en errores de red/request
    },

    // Log de requests en desarrollo
    onRequest({ request, options }) {
      if (process.dev) {
        console.log('🌐 API Request:', {
          url: request,
          method: options.method || 'GET',
          hasAuth: !!options.headers?.Authorization,
        });
      }
    },

    // Log de responses en desarrollo
    onResponse({ response }) {
      if (process.dev) {
        console.log('✅ API Response:', {
          status: response.status,
          url: response.url,
        });
      }
    },
  };

  // Merge opciones
  const finalOptions = {
    ...defaults,
    ...options,
    headers: {
      ...defaults.headers,
      ...options.headers,
    },
  };

  return useFetch(endpoint, finalOptions);
};
