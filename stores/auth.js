// stores/auth.js - ARREGLADO
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null,
    loading: true,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
  },

  actions: {
    // Inicializar el store con el token de la cookie
    async initAuth() {
      const tokenCookie = useCookie('auth-token');
      if (tokenCookie.value) {
        this.token = tokenCookie.value;
        await this.fetchUser();
      } else {
        this.loading = false;
      }
    },

    async login(credentials) {
      this.loading = true;

      try {
        const { data, error } = await useApiFetch('/users/login', {
          method: 'POST',
          body: credentials,
        });

        if (error.value) {
          throw new Error(error.value.data?.message || 'Error en el login.');
        }

        console.log('🔑 Login response:', data.value);

        // 🔥 ARREGLO: El backend devuelve el token en props.accessToken
        const response = data.value;
        const token = response.props?.accessToken || response.accessToken || response.token;
        const user = response.data;

        if (!token) {
          throw new Error('No se recibió token de autenticación');
        }

        // Guardar token en cookie y state
        const tokenCookie = useCookie('auth-token', {
          maxAge: 60 * 60 * 24 * 7, // 7 días
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax'
        });

        tokenCookie.value = token;
        this.token = token;
        this.user = user;
        this.loading = false;

        console.log('✅ Login successful:', { user: user.nicename, hasToken: !!token });

        return response;
      } catch (error) {
        this.loading = false;
        console.error('❌ Login error:', error);
        throw error;
      }
    },

    async register(userInfo) {
      this.loading = true;

      try {
        const { data, error } = await useApiFetch('/users/register', {
          method: 'POST',
          body: userInfo,
        });

        if (error.value) {
          throw new Error(error.value.data?.message || 'Error en el registro.');
        }

        this.loading = false;
        return data.value;
      } catch (error) {
        this.loading = false;
        throw error;
      }
    },

    // 🔥 ARREGLO: fetchUser más inteligente
    async fetchUser() {
      if (!this.token) {
        this.loading = false;
        return;
      }

      try {
        const { data, error } = await useApiFetch('/users/me');

        if (error.value) {
          console.error('Error fetching user:', error.value);

          // 🔥 ARREGLO: Solo logout si es error de token, no otros errores
          const status = error.value.status || error.value.statusCode;
          const message = error.value.data?.message || error.value.message || '';

          if (status === 401 && (
            message.toLowerCase().includes('token') ||
            message.toLowerCase().includes('unauthorized') ||
            message.toLowerCase().includes('expired')
          )) {
            console.log('🔒 Token invalid during fetchUser, logging out');
            this.logout();
          } else {
            console.warn('⚠️ fetchUser failed but not token error:', message);
            // NO hacer logout, solo marcar loading como false
            this.loading = false;
          }
          return;
        }

        if (data.value?.data) {
          this.user = data.value.data;
          console.log('✅ User fetched:', this.user.nicename);
        } else {
          console.error('No user data received');
          // 🔥 ARREGLO: NO hacer logout aquí, puede ser error temporal del servidor
          this.loading = false;
        }
      } catch (error) {
        console.error('Error in fetchUser:', error);

        // 🔥 ARREGLO: Solo logout en errores muy específicos
        if (error.message?.includes('401') || error.message?.toLowerCase().includes('unauthorized')) {
          this.logout();
        } else {
          // Para otros errores, no hacer logout
          this.loading = false;
        }
      } finally {
        this.loading = false;
      }
    },

    logout() {
      // Limpiar cookie
      const tokenCookie = useCookie('auth-token');
      tokenCookie.value = null;

      // Limpiar state
      this.token = null;
      this.user = null;
      this.loading = false;

      console.log('🚪 User logged out');

      // 🔥 ARREGLO: Redirigir más inteligente
      const route = useRoute();
      const publicPages = ['/', '/login', '/register', '/auth/login', '/auth/register'];
      const isPublicPage = publicPages.some(page => route.path.startsWith(page));

      if (!isPublicPage) {
        navigateTo('/auth/login');
      }
    },
  },
});
