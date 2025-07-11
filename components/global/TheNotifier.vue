<template>
	<!-- Contenedor fijo para las notificaciones -->
	<div class="fixed top-5 right-5 z-[100] w-full max-w-sm space-y-3">
		<!-- TransitionGroup para animar la entrada y salida de cada notificación -->
		<TransitionGroup name="toast-slide" tag="div">
			<div
				v-for="notification in notifications"
				:key="notification.id"
				class="flex items-start w-full p-4 rounded-xl shadow-2xl backdrop-blur-xl border"
				:class="toastClasses(notification.type)"
			>
				<!-- Icono basado en el tipo de notificación -->
				<div class="flex-shrink-0">
					<Icon :name="iconName(notification.type)" class="w-6 h-6" :class="iconClasses(notification.type)" />
				</div>
				<!-- Mensaje -->
				<div class="ml-3 flex-1">
					<p class="text-sm font-medium text-white/90">
						{{ notification.message }}
					</p>
				</div>
				<!-- Botón de cerrar -->
				<div class="ml-4 flex-shrink-0">
					<button
						@click="removeNotification(notification.id)"
						class="inline-flex text-white/50 hover:text-white transition-colors"
					>
						<Icon name="heroicons:x-mark-20-solid" class="w-5 h-5" />
					</button>
				</div>
			</div>
		</TransitionGroup>
	</div>
</template>

<script setup>
	import { useNotifications } from '#imports';

	const { notifications, removeNotification } = useNotifications();

	// --- Funciones para estilos dinámicos ---

	const toastClasses = (type) => {
		const map = {
			success: 'bg-success/20 border-success/30',
			error: 'bg-error/20 border-error/30',
			warning: 'bg-warning/20 border-warning/30',
			info: 'bg-primary/20 border-primary/30',
		};
		return map[type] || map.info;
	};

	const iconName = (type) => {
		const map = {
			success: 'heroicons:check-circle-20-solid',
			error: 'heroicons:x-circle-20-solid',
			warning: 'heroicons:exclamation-triangle-20-solid',
			info: 'heroicons:information-circle-20-solid',
		};
		return map[type] || map.info;
	};

	const iconClasses = (type) => {
		const map = {
			success: 'text-success',
			error: 'text-error',
			warning: 'text-warning',
			info: 'text-primary',
		};
		return map[type] || map.info;
	};
</script>

<style scoped>
	/* Animaciones para la entrada y salida de los toasts */
	.toast-slide-enter-active,
	.toast-slide-leave-active {
		transition: all 0.5s ease;
	}

	.toast-slide-enter-from,
	.toast-slide-leave-to {
		opacity: 0;
		transform: translateX(100%);
	}

	.toast-slide-move {
		transition: transform 0.3s ease;
	}
</style>
