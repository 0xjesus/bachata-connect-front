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
                    <UiSpinner v-if="loading" size="sm" class="mr-2"/>
                    <span>{{ loading ? 'Publicando...' : 'Publicar Actualización' }}</span>
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>

// --- INICIO CORRECCIÓN #1: IMPORTACIÓN EXPLÍCITA ---
// Para evitar el warning y asegurar que el componente siempre se encuentre.

const props = defineProps({
    eventId: { type: String, required: true }
});

const emit = defineEmits(['update-posted']);
const { $toast } = useNuxtApp();

const content = ref('');
const loading = ref(false);

async function submitUpdate() {
    console.log('[SUBMIT UPDATE] 🚀 Función iniciada.');
    if (!content.value.trim()) return;

    loading.value = true;
    try {
        const { error } = await useApiFetch(`/events/${props.eventId}/updates`, {
            method: 'POST',
            body: { content: content.value }
        });

        if (error.value) {
            // Si la API devuelve un error, lo lanzamos para que lo capture el catch.
            throw new Error(error.value.data?.message || 'Ocurrió un error en el servidor.');
        }

        console.log('[SUBMIT UPDATE] ✅ La llamada a la API fue exitosa.');

        // --- INICIO CORRECCIÓN #2: COMPROBACIÓN DE $toast ---
        // Verificamos que el plugin de notificaciones exista antes de usarlo.
        if ($toast && typeof $toast.success === 'function') {
            $toast.success('¡Actualización publicada!');
        } else {
            console.warn('[SUBMIT UPDATE] El plugin $toast no está disponible. No se mostró notificación de éxito.');
            alert('¡Actualización publicada!'); // Fallback a un alert simple.
        }

        content.value = '';
        emit('update-posted');

    } catch (e) {
        console.error('[SUBMIT UPDATE] 🔥 ERROR CAPTURADO EN CATCH:', e);
        // Hacemos la misma comprobación para el toast de error.
        if ($toast && typeof $toast.error === 'function') {
            $toast.error(e.message || 'No se pudo publicar la actualización.');
        } else {
             console.warn('[SUBMIT UPDATE] El plugin $toast no está disponible. No se mostró notificación de error.');
             alert(`Error: ${e.message || 'No se pudo publicar la actualización.'}`);
        }
    } finally {
        loading.value = false;
        console.log('[SUBMIT UPDATE] 🏁 Función finalizada.');
    }
}
</script>
