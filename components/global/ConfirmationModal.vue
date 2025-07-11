<template>
	<Transition name="modal-fade">
		<div
			v-if="isVisible"
			class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md"
			@click.self="handleCancel"
		>
			<div class="card-glass w-full max-w-md m-4 p-8 rounded-2xl shadow-2xl border border-white/20">
				<div class="flex items-start space-x-4">
					<!-- Icono -->
					<div class="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center bg-warning/20 border-2 border-warning/30">
						<Icon name="heroicons:exclamation-triangle-20-solid" class="w-6 h-6 text-warning" />
					</div>

					<!-- Contenido -->
					<div class="flex-1">
						<h3 class="text-xl font-bold text-white mb-2">{{ title }}</h3>
						<p class="text-white/80 leading-relaxed">{{ message }}</p>
					</div>
				</div>

				<!-- Botones de Acción -->
				<div class="mt-8 flex justify-end space-x-4">
					<button @click="handleCancel" class="btn-secondary px-6 py-2">
						{{ options.cancelText || 'Cancelar' }}
					</button>
					<button
						@click="handleConfirm"
						class="btn-primary px-6 py-2 bg-error hover:bg-red-700 focus:ring-error/50"
					>
						{{ options.confirmText || 'Confirmar' }}
					</button>
				</div>
			</div>
		</div>
	</Transition>
</template>

<script setup>
	import { useConfirmation } from '#imports';

	const { isVisible, title, message, options, handleConfirm, handleCancel } = useConfirmation();
</script>

<style scoped>
	.modal-fade-enter-active,
	.modal-fade-leave-active {
		transition: opacity 0.3s ease;
	}

	.modal-fade-enter-from,
	.modal-fade-leave-to {
		opacity: 0;
	}

	.modal-fade-enter-active .card-glass,
	.modal-fade-leave-active .card-glass {
		transition: transform 0.3s ease;
	}

	.modal-fade-enter-from .card-glass,
	.modal-fade-leave-to .card-glass {
		transform: scale(0.95);
	}
</style>
