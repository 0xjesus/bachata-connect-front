// middleware/auth.global.js
export default defineNuxtRouteMiddleware(async (to, from) => {
  // Solo ejecutar en el cliente
  if (process.server) return;

  const authStore = useAuthStore();

  // Rutas que requieren autenticación
  const protectedRoutes = ['/dashboard', '/events/create'];

  // Rutas que son solo para invitados (usuarios no autenticados)
  const guestOnlyRoutes = ['/login', '/register'];

  // Verificar si la ruta actual requiere autenticación
  const requiresAuth = protectedRoutes.some(path => to.path.startsWith(path));
  const isGuestOnly = guestOnlyRoutes.includes(to.path);

  // Si la ruta requiere autenticación y el usuario no está autenticado
  if (requiresAuth && !authStore.isAuthenticated) {
    console.log('🔒 Global middleware: Redirecting to login - auth required');
    return navigateTo('/login');
  }

  // Si es una ruta solo para invitados y el usuario está autenticado
  if (isGuestOnly && authStore.isAuthenticated) {
    console.log('🏠 Global middleware: Redirecting to dashboard - already authenticated');
    return navigateTo('/dashboard');
  }
});
