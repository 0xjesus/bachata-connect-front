// composables/useNotifications.js
import { ref } from 'vue';

// Estado reactivo que contendrá la lista de notificaciones.
// Es global gracias a la magia de los composables de Nuxt.
const notifications = ref([]);

/**
 * Composable para gestionar notificaciones globales (toasts/snacks).
 */
export const useNotifications = () => {

  /**
   * Añade una nueva notificación a la lista.
   * @param {object} notification - El objeto de la notificación.
   * @param {string} notification.message - El mensaje a mostrar.
   * @param {string} [notification.type='info'] - Tipo de notificación (success, error, warning, info).
   * @param {number} [notification.duration=4000] - Duración en milisegundos.
   */
  const addNotification = ({ message, type = 'info', duration = 4000 }) => {
    // Generamos un ID único para cada notificación, crucial para las animaciones.
    const id = Date.now() + Math.random();

    notifications.value.push({ id, message, type });

    // Creamos un temporizador para eliminar la notificación automáticamente.
    setTimeout(() => {
      removeNotification(id);
    }, duration);
  };

  /**
   * Elimina una notificación de la lista por su ID.
   * @param {number} id - El ID de la notificación a eliminar.
   */
  const removeNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id);
    if (index !== -1) {
      notifications.value.splice(index, 1);
    }
  };

  // Exponemos el estado reactivo y las funciones para que puedan ser usados en cualquier componente.
  return {
    notifications,
    addNotification,
    removeNotification,
  };
};
