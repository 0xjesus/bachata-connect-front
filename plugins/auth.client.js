// plugins/auth.client.js
export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();

  // Inicializar autenticación al cargar la app
  await authStore.initAuth();
});
