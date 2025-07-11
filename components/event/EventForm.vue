<template>
	<form @submit.prevent="handleSubmit" class="space-y-8">

		<div class="space-y-6">
			<div class="text-center pb-6 border-b border-white/10">
				<h2 class="text-2xl font-bold text-white mb-2">Detalles del Evento</h2>
				<p class="text-white/70">Comparte tu visión con la comunidad</p>
			</div>

			<div class="group">
				<label
					for="title"
					class="block text-sm font-semibold text-white/90 mb-2 group-focus-within:text-primary transition-colors duration-300"
				>Título del Evento</label>
				<div class="relative">
					<div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
						<svg
							class="h-5 w-5 text-white/50 group-focus-within:text-primary transition-colors duration-300"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
							/>
						</svg>
					</div>
					<input
						id="title"
						v-model="form.title"
						type="text"
						placeholder="Ej: Festival de Bachata Bajo las Estrellas"
						required
						class="input-glass pl-12 pr-4 py-4 text-lg hover:bg-white/15"
					/>
				</div>
			</div>

			<div class="group">
				<label
					for="description"
					class="block text-sm font-semibold text-white/90 mb-2 group-focus-within:text-primary transition-colors duration-300"
				>Descripción del Evento</label>
				<div class="relative">
					<div class="absolute top-4 left-4 pointer-events-none">
						<svg
							class="h-5 w-5 text-white/50 group-focus-within:text-primary transition-colors duration-300"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
							/>
						</svg>
					</div>
					<textarea
						id="description"
						v-model="form.description"
						rows="5"
						class="input-glass pl-12 pr-4 py-4 text-base resize-none hover:bg-white/15 min-h-[120px]"
						placeholder="Cuéntanos sobre tu evento: ¿qué lo hace especial? ¿quién participará? ¿dónde será?..."
						required
					/>
				</div>
				<div class="mt-2 flex justify-between text-xs text-white/60">
					<span>Sé descriptivo y entusiasta</span>
					<span>{{ form.description?.length || 0 }} caracteres</span>
				</div>
			</div>
		</div>

		<div class="space-y-6">
			<div class="text-center pb-6 border-b border-white/10">
				<h3 class="text-xl font-bold text-white mb-2">Fechas y Financiamiento</h3>
				<p class="text-white/70">Define tus metas y cronograma</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">

				<div class="group">
					<label
						for="targetAmount"
						class="block text-sm font-semibold text-white/90 mb-2 group-focus-within:text-primary transition-colors duration-300"
					>Meta de Financiamiento</label>
					<div class="relative">
						<div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
							<span class="text-white/50 group-focus-within:text-primary transition-colors duration-300 font-bold text-lg">$</span>
						</div>
						<input
							id="targetAmount"
							v-model.number="form.targetAmount"
							type="number"
							min="100"
							step="100"
							placeholder="5000"
							required
							class="input-glass pl-8 pr-4 py-4 text-lg hover:bg-white/15"
						/>
					</div>
					<p class="mt-2 text-xs text-white/60">Monto total que necesitas para realizar el evento.</p>
				</div>

				<div class="group">
					<label
						for="eventDate"
						class="block text-sm font-semibold text-white/90 mb-2 group-focus-within:text-primary transition-colors duration-300"
					>Fecha del Evento</label>
					<div class="relative">
						<div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
							<svg
								class="h-5 w-5 text-white/50 group-focus-within:text-primary transition-colors duration-300"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
								/>
							</svg>
						</div>
						<input
							id="eventDate"
							v-model="form.eventDate"
							type="date"
							:min="minDate"
							required
							class="input-glass pl-12 pr-4 py-4 text-lg hover:bg-white/15"
						/>
					</div>
					<p class="mt-2 text-xs text-white/60">¿Cuándo se llevará a cabo el evento?</p>
				</div>
				<div class="group">
					<label
						for="fundingDeadline"
						class="block text-sm font-semibold text-white/90 mb-2 group-focus-within:text-primary transition-colors duration-300"
					>Fecha Límite de Fondeo</label>
					<div class="relative">
						<div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
							<svg
								class="h-5 w-5 text-white/50 group-focus-within:text-primary transition-colors duration-300"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
								/>
							</svg>
						</div>
						<input
							id="fundingDeadline"
							v-model="form.fundingDeadline"
							type="date"
							:min="minDate"
							required
							class="input-glass pl-12 pr-4 py-4 text-lg hover:bg-white/15"
						/>
					</div>
					<p class="mt-2 text-xs text-white/60">¿Hasta cuándo aceptarás contribuciones?</p>
				</div>
			</div>
		</div>

		<div class="space-y-6 pt-8 border-t border-white/10">
			<div class="flex items-start space-x-3">
				<input v-model="acceptTerms" type="checkbox" id="terms" class="checkbox-custom mt-1" required />
				<label for="terms" class="text-sm text-white/80 leading-relaxed cursor-pointer">
					Confirmo que la información es verdadera y acepto los <a
					href="#"
					class="text-primary hover:text-secondary underline"
				>Términos de Servicio</a> y las <a
					href="#"
					class="text-primary hover:text-secondary underline"
				>Políticas de Financiamiento</a>.
				</label>
			</div>
			<button
				type="submit"
				:disabled="loading || !acceptTerms || !isFormValid"
				class="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
			>
				<svg
					v-if="loading"
					class="animate-spin h-6 w-6 mr-3 text-white"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
				<span v-if="!loading" class="flex items-center justify-center space-x-2"><span>🎉 Crear Mi Evento</span>
					<svg
						class="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 7l5 5m0 0l-5 5m5-5H6"
						/>
					</svg>
				</span>
				<span v-else>Creando evento...</span>
			</button>
			<p class="text-center text-xs text-white/60">Tu evento será revisado antes de ser publicado. Te notificaremos por email cuando esté activo.</p>
		</div>
	</form>
</template>

<script setup>
	const { addNotification } = useNotifications();

	const props = defineProps({
		initialData: {
			type: Object,
			default: () => ({ title: '', description: '', targetAmount: null, fundingDeadline: '', eventDate: '' }), // <-- Añadido aquí
		},
		loading: Boolean,
	});

	const emit = defineEmits([ 'submit' ]);

	const form = ref({ ...props.initialData, eventDate: '' }); // <-- Añadido aquí
	const acceptTerms = ref(false);

	const minDate = computed(() => {
		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		return tomorrow.toISOString().split('T')[0];
	});

	const isFormValid = computed(() => {
		return form.value.title &&
			form.value.description &&
			form.value.targetAmount &&
			form.value.fundingDeadline &&
			form.value.eventDate && // <-- Añadido aquí
			form.value.targetAmount >= 100;
	});

	function handleSubmit() {
		if(!acceptTerms.value) {
			addNotification({
				type: 'error',
				message: 'Debes aceptar los términos y condiciones para continuar.',
			})
			return;
		}
		// CORRECCIÓN: No se renombra nada. Se envía el objeto del formulario tal cual.
		// Los nombres en `form` (fundingDeadline, eventDate) ya coinciden con lo que Prisma espera.
		emit('submit', form.value);
	}
</script>

<style scoped>
	.checkbox-custom {
		appearance: none;
		width: 1rem;
		height: 1rem;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-radius: 0.25rem;
		background: var(--glass-bg);
		backdrop-filter: blur(10px);
		position: relative;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.checkbox-custom:checked {
		background: rgb(var(--color-primary));
		border-color: rgb(var(--color-primary));
	}

	.checkbox-custom:checked::after {
		content: '✓';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: white;
		font-size: 0.75rem;
		font-weight: bold;
	}

	.checkbox-custom:hover {
		border-color: rgb(var(--color-primary) / 0.5);
		background: rgba(255, 255, 255, 0.15);
	}
</style>
