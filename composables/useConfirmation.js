// composables/useConfirmation.js
import { ref } from 'vue';

// Estado reactivo para controlar el modal
const isVisible = ref(false);
const title = ref('');
const message = ref('');
const options = ref({});

// Esta variable es la clave: guardará la función `resolve` de nuestra Promesa.
let promiseResolver = null;

/**
 * Composable para mostrar un modal de confirmación y esperar la respuesta del usuario.
 */
export const useConfirmation = () => {

	/**
	 * Muestra el modal de confirmación y devuelve una Promesa que se resuelve con la decisión del usuario.
	 * @param {object} config - La configuración del modal.
	 * @param {string} config.title - El título del modal.
	 * @param {string} config.message - El mensaje de confirmación.
	 * @param {object} [config.options] - Opciones adicionales (ej. texto de botones).
	 * @returns {Promise<boolean>} - Se resuelve a `true` si se confirma, `false` si se cancela.
	 */
	const show = (config) => {
		title.value = config.title;
		message.value = config.message;
		options.value = config.options || {};
		isVisible.value = true;

		// Creamos y retornamos una nueva Promesa. El código que llamó a `show` se pausará aquí.
		return new Promise((resolve) => {
			promiseResolver = resolve;
		});
	};

	// Función que el modal llamará al confirmar.
	const handleConfirm = () => {
		if(promiseResolver) {
			promiseResolver(true); // Resuelve la promesa con `true`.
		}
		isVisible.value = false;
	};

	// Función que el modal llamará al cancelar.
	const handleCancel = () => {
		if(promiseResolver) {
			promiseResolver(false); // Resuelve la promesa con `false`.
		}
		isVisible.value = false;
	};

	return {
		isVisible,
		title,
		message,
		options,
		show,
		handleConfirm,
		handleCancel,
	};
};
