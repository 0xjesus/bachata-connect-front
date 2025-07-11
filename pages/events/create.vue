<!-- pages/events/create.vue -->
<template>
  <div class="min-h-screen">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      <!-- Page Header -->
      <div class="text-center mb-12 animate-fade-in-up">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-full glass-intense mb-6 shadow-brand">
          <svg class="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
        </div>

        <h1 class="text-4xl lg:text-5xl font-bold text-white mb-4">
          Crea tu <span class="text-brand-gradient">Evento Épico</span>
        </h1>

        <p class="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
          Transforma tu visión en realidad. Conecta con la comunidad y financia el evento de baile que siempre soñaste.
        </p>
      </div>

      <!-- Progress Steps -->
      <div class="mb-12 animate-fade-in-up delay-200">
        <div class="flex items-center justify-center space-x-8 max-w-2xl mx-auto">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">1</div>
            <span class="text-white font-medium">Detalles</span>
          </div>
          <div class="w-16 h-1 bg-primary/30 rounded-full">
            <div class="w-full h-1 bg-primary rounded-full"></div>
          </div>
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">2</div>
            <span class="text-white font-medium">Financiamiento</span>
          </div>
          <div class="w-16 h-1 bg-primary/30 rounded-full">
            <div class="w-full h-1 bg-primary rounded-full"></div>
          </div>
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">3</div>
            <span class="text-white font-medium">Publicar</span>
          </div>
        </div>
      </div>

      <!-- Main Form Container -->
      <div class="card-glass p-8 lg:p-12 animate-fade-in-up delay-300">

        <!-- Form Header -->
        <div class="text-center mb-8 pb-8 border-b border-white/10">
          <h2 class="text-2xl font-bold text-white mb-3">¡Vamos a crear algo increíble!</h2>
          <p class="text-white/70">Completa la información para que tu evento destaque en la comunidad</p>
        </div>

        <!-- Event Form -->
        <EventForm @submit="createEvent" :loading="loading" />

        <!-- Error Display -->
        <div v-if="error" class="mt-8 glass bg-error/20 border border-error/30 rounded-xl p-6 animate-shake">
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-red-200 mb-2">Error al crear el evento</h3>
              <p class="text-red-200">{{ error }}</p>
              <button
                @click="error = ''"
                class="mt-3 text-red-300 hover:text-red-200 underline text-sm transition-colors duration-300"
              >
                Intentar de nuevo
              </button>
            </div>
          </div>
        </div>

        <!-- Success Tips -->
        <div class="mt-12 pt-8 border-t border-white/10">
          <h3 class="text-lg font-bold text-white mb-6 flex items-center space-x-2">
            <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
            <span>Consejos para el éxito</span>
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="glass rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
              <div class="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                </svg>
              </div>
              <h4 class="font-bold text-white mb-2">Descripción Detallada</h4>
              <p class="text-white/70 text-sm">Explica claramente qué hace especial tu evento. ¡La pasión se contagia!</p>
            </div>

            <div class="glass rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
              <div class="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                </svg>
              </div>
              <h4 class="font-bold text-white mb-2">Meta Realista</h4>
              <p class="text-white/70 text-sm">Define una meta alcanzable. Es mejor superar expectativas que quedarse corto.</p>
            </div>

            <div class="glass rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
              <div class="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <h4 class="font-bold text-white mb-2">Comparte Pronto</h4>
              <p class="text-white/70 text-sm">Una vez publicado, comparte en redes sociales para maximizar el alcance.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="text-center mt-12 animate-fade-in-up delay-400">
        <p class="text-white/60 mb-4">
          ¿Necesitas ayuda? Nuestro equipo está aquí para apoyarte
        </p>
        <a href="#" class="text-primary hover:text-secondary underline decoration-2 underline-offset-4 transition-colors duration-300">
          Contactar soporte →
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ middleware: 'auth' });

const loading = ref(false);
const error = ref('');

async function createEvent(eventData) {
  loading.value = true;
  error.value = '';

  try {
    const { data: response, error: apiError } = await useApiFetch('/events', {
      method: 'POST',
      body: eventData
    });

    if (apiError.value) {
      throw new Error(apiError.value.data?.message || 'Error desconocido al crear el evento');
    }

    // Success - redirect to the event page
    navigateTo(`/events/${response.value.data.publicSlug}`);

  } catch (e) {
    error.value = e.message;

    // Scroll to error
    setTimeout(() => {
      const errorElement = document.querySelector('.animate-shake');
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);

  } finally {
    loading.value = false;
  }
}

useHead({
  title: 'Crear Evento - BachataConnect',
  meta: [
    { name: 'description', content: 'Crea y financia tu evento de baile con BachataConnect. Conecta con la comunidad y haz realidad tu visión.' }
  ]
});
</script>
