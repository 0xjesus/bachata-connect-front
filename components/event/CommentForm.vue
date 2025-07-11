<!-- components/event/CommentForm.vue -->
<template>
  <div class="space-y-4">

    <form @submit.prevent="postComment" class="space-y-4">

      <!-- Comment Input Area -->
      <div class="glass rounded-2xl p-4 relative overflow-hidden">

        <!-- Background decoration -->
        <div class="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl opacity-50"></div>

        <div class="relative z-10 space-y-4">

          <!-- Main input area -->
          <div class="flex space-x-3">

            <!-- User avatar -->
            <div class="flex-shrink-0">
              <div class="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary/30 flex items-center justify-center">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
            </div>

            <!-- Input field -->
            <div class="flex-1">
              <div class="relative">
                <textarea
                  v-model="content"
                  placeholder="Comparte tu opinión sobre este evento..."
                  required
                  rows="3"
                  class="input-glass w-full px-4 py-3 text-base resize-none hover:bg-white/15 focus:bg-white/15 transition-all duration-300"
                  :class="{ 'border-error/50': error }"
                  @keydown.enter.meta.prevent="postComment"
                  @keydown.enter.ctrl.prevent="postComment"
                />

                <!-- Character counter -->
                <div class="absolute bottom-2 right-2 text-xs text-white/40">
                  {{ content.length }}/500
                </div>
              </div>

              <!-- Quick emoji reactions -->
              <div class="flex items-center space-x-2 mt-2">
                <span class="text-xs text-white/60">Reacciones rápidas:</span>
                <button
                  v-for="emoji in quickEmojis"
                  :key="emoji"
                  type="button"
                  @click="addEmoji(emoji)"
                  class="text-lg hover:scale-125 transition-transform duration-200 hover:bg-white/10 rounded-full p-1"
                >
                  {{ emoji }}
                </button>
              </div>
            </div>
          </div>

          <!-- Action bar -->
          <div class="flex items-center justify-between pt-3 border-t border-white/10">

            <!-- Left side - formatting options -->
            <div class="flex items-center space-x-3">
              <span class="text-xs text-white/60">
                <kbd class="px-1.5 py-0.5 bg-white/10 rounded text-xs">⌘</kbd> +
                <kbd class="px-1.5 py-0.5 bg-white/10 rounded text-xs">Enter</kbd>
                para enviar
              </span>
            </div>

            <!-- Right side - submit button -->
            <div class="flex items-center space-x-3">
              <button
                type="submit"
                :disabled="!content.trim() || loading || content.length > 500"
                class="btn-primary px-6 py-2 text-sm rounded-full disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
              >
                <!-- Loading spinner -->
                <svg v-if="loading" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>

                <!-- Send icon -->
                <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>

                <span v-if="!loading">Enviar</span>
                <span v-else>Enviando...</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>

    <!-- Error Message -->
    <div v-if="error" class="glass bg-error/20 border border-error/30 rounded-xl p-4 animate-shake">
      <div class="flex items-center space-x-3">
        <svg class="h-5 w-5 text-red-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <p class="text-red-200 font-medium text-sm">{{ error }}</p>
      </div>
    </div>

    <!-- Success feedback -->
    <div v-if="showSuccess" class="glass bg-success/20 border border-success/30 rounded-xl p-4 animate-fade-in-up">
      <div class="flex items-center space-x-3">
        <svg class="h-5 w-5 text-green-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        <p class="text-green-200 font-medium text-sm">¡Comentario enviado exitosamente!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  updateId: { type: String, required: true }
});

const emit = defineEmits(['comment-posted']);

const content = ref('');
const loading = ref(false);
const error = ref('');
const showSuccess = ref(false);

// Quick emoji reactions
const quickEmojis = ['🔥', '💃', '🕺', '❤️', '👏', '🎉'];

function addEmoji(emoji) {
  content.value += emoji;
}

async function postComment() {
  if (!content.value.trim()) return;

  if (content.value.length > 500) {
    error.value = 'El comentario no puede exceder 500 caracteres';
    return;
  }

  loading.value = true;
  error.value = '';

  try {
    const { error: apiError } = await useApiFetch(`/updates/${props.updateId}/comments`, {
      method: 'POST',
      body: { content: content.value.trim() }
    });

    if (apiError.value) {
      throw new Error(apiError.value.data?.message || 'Error al enviar comentario');
    }

    // Success feedback
    showSuccess.value = true;
    setTimeout(() => {
      showSuccess.value = false;
    }, 3000);

    content.value = '';
    emit('comment-posted');

  } catch (e) {
    error.value = e.message;
    // Auto-hide error after 5 seconds
    setTimeout(() => {
      error.value = '';
    }, 5000);
  } finally {
    loading.value = false;
  }
}
</script>
