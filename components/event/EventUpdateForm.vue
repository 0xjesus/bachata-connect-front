<template>
	<div class="card-glass p-6 space-y-4 border border-primary/30 mb-8">
		<h3 class="text-lg font-bold text-white flex items-center space-x-2">
			<Icon name="heroicons:megaphone-20-solid" class="text-primary" />
			<span>Publicar una Actualización</span>
		</h3>
		<form @submit.prevent="submitUpdate" class="space-y-4">
			<textarea
				v-model="content"
				rows="4"
				class="input-glass w-full"
				placeholder="Comparte novedades, agradecimientos o cualquier información importante sobre tu evento..."
				required
			></textarea>
			<div class="flex justify-end">
				<button
					type="submit"
					:disabled="loading || !content.trim()"
					class="btn-primary px-6 py-2"
				>
					<GlobalSpinner v-if="loading" size="sm" class="mr-2" />
					<span>{{ loading ? 'Publicando...' : 'Publicar Actualización' }}</span>
				</button>
			</div>
		</form>
	</div>
</template>

<script setup>
	const { addNotification } = useNotifications();
	const props = defineProps({
		eventId: { type: String, required: true },
	});

	const emit = defineEmits([ 'update-posted' ]);

	const content = ref('');
	const loading = ref(false);

	async function submitUpdate() {
		console.log('[SUBMIT UPDATE] 🚀 Función iniciada.');
		if(!content.value.trim()) return;

		loading.value = true;
		try {
			const { error } = await useApiFetch(`/events/${ props.eventId }/updates`, {
				method: 'POST',
				body: { content: content.value },
			});

			if(error.value) {
				// Si la API devuelve un error, lo lanzamos para que lo capture el catch.
				throw new Error(error.value.data?.message || 'Ocurrió un error en el servidor.');
			}

			console.log('[SUBMIT UPDATE] ✅ La llamada a la API fue exitosa.');

			addNotification({
				type: 'success',
				message: '¡Actualización publicada exitosamente!',
			})

			content.value = '';
			emit('update-posted');

		} catch(e) {
			console.error('[SUBMIT UPDATE] 🔥 ERROR CAPTURADO EN CATCH:', e);

			addNotification({
				type: 'error',
				message: e.message || 'No se pudo publicar la actualización.',
			})

		} finally {
			loading.value = false;
			console.log('[SUBMIT UPDATE] 🏁 Función finalizada.');
		}
	}
</script>
