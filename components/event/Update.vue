<!-- components/event/Update.vue -->
<template>
  <article class="group relative">

    <!-- Update card -->
    <div class="card-glass p-6 relative overflow-hidden hover:bg-white/15 transition-all duration-500 border-l-4 border-primary/50">

      <!-- Background decoration -->
      <div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      <!-- Header -->
      <header class="flex items-start space-x-4 mb-4 relative z-10">

        <!-- Author avatar -->
        <div class="relative flex-shrink-0">
          <img
            :src="update.author.metas?.profile_picture_url || `https://picsum.photos/48/48?random=${update.author.id}`"
            :alt="update.author.nicename"
            class="w-12 h-12 rounded-full object-cover border-2 border-white/20 group-hover:border-primary/50 transition-all duration-300"
          />

          <!-- Author badge -->
          <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full border-2 border-slate-800 flex items-center justify-center">
            <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        </div>

        <!-- Author info and metadata -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-bold text-white group-hover:text-primary transition-colors duration-300">
                {{ update.author.nicename }}
              </h3>
              <div class="flex items-center space-x-2 text-white/60 text-sm">
                <span class="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs border border-primary/30">
                  🎯 Organizador
                </span>
                <span>•</span>
                <time :datetime="update.created" class="flex items-center space-x-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>{{ formatDate(update.created) }}</span>
                </time>
              </div>
            </div>

            <!-- Update type indicator -->
            <div class="flex items-center space-x-2">
              <span class="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-xs font-medium border border-secondary/30">
                📢 Actualización
              </span>
            </div>
          </div>
        </div>
      </header>

      <!-- Update content -->
      <div class="relative z-10 mb-6">
        <div class="prose prose-invert max-w-none">
          <p class="text-white/90 leading-relaxed text-base">
            {{ update.content }}
          </p>
        </div>
      </div>

      <!-- Action bar -->
      <footer class="relative z-10 flex items-center justify-between pt-4 border-t border-white/10">

        <!-- Engagement stats -->
        <div class="flex items-center space-x-6">

          <!-- Comments toggle -->
          <button
            @click="showComments = !showComments"
            class="flex items-center space-x-2 text-white/70 hover:text-primary transition-colors duration-300 group/comment"
          >
            <div class="relative">
              <svg class="w-5 h-5 group-hover/comment:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>

              <!-- Comment count badge -->
              <span v-if="commentCount > 0" class="absolute -top-2 -right-2 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center border-2 border-slate-800">
                {{ commentCount }}
              </span>
            </div>

            <span class="text-sm font-medium">
              {{ commentToggleText }}
            </span>
          </button>

          <!-- Like button -->
          <button class="flex items-center space-x-2 text-white/70 hover:text-red-400 transition-colors duration-300 group/like">
            <svg class="w-5 h-5 group-hover/like:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            <span class="text-sm font-medium">{{ likeCount }}</span>
          </button>

          <!-- Share button -->
          <button class="flex items-center space-x-2 text-white/70 hover:text-blue transition-colors duration-300 group/share">
            <svg class="w-5 h-5 group-hover/share:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
            </svg>
            <span class="text-sm font-medium">Compartir</span>
          </button>
        </div>

        <!-- More options -->
        <button class="text-white/40 hover:text-white/70 transition-colors duration-300 p-2 rounded-full hover:bg-white/10">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
          </svg>
        </button>
      </footer>
    </div>

    <!-- Comments section -->
    <Transition name="slide-down">
      <section v-if="showComments" class="mt-6 ml-8 space-y-6">

        <!-- Loading state -->
        <div v-if="loadingComments" class="flex items-center justify-center py-8">
          <div class="flex items-center space-x-3 text-white/60">
            <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="text-sm">Cargando comentarios...</span>
          </div>
        </div>

        <!-- Comments list -->
        <div v-else-if="comments.length > 0" class="space-y-4">
          <h4 class="text-lg font-bold text-white flex items-center space-x-2">
            <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
            </svg>
            <span>Comentarios ({{ comments.length }})</span>
          </h4>

          <div class="space-y-4">
            <EventComment
              v-for="comment in comments"
              :key="comment.id"
              :comment="comment"
              class="animate-fade-in-up"
            />
          </div>
        </div>

        <!-- Empty comments state -->
        <div v-else-if="!loadingComments" class="text-center py-8">
          <div class="glass rounded-2xl p-6 max-w-sm mx-auto">
            <div class="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
            </div>
            <p class="text-white/70 text-sm">Aún no hay comentarios. ¡Sé el primero en comentar!</p>
          </div>
        </div>

        <!-- Comment form -->
        <div class="border-t border-white/10 pt-6">
          <EventCommentForm
            :update-id="update.id"
            @comment-posted="handleCommentPosted"
          />
        </div>
      </section>
    </Transition>
  </article>
</template>

<script setup>
const props = defineProps({
  update: { type: Object, required: true },
  event: { type: Object, required: true },
});

const showComments = ref(false);
const comments = ref([]);
const loadingComments = ref(false);

// Computed properties
const commentCount = computed(() => {
  return props.update._count?.comments || 0;
});

const commentToggleText = computed(() => {
  if (showComments.value) return 'Ocultar comentarios';
  const count = commentCount.value;
  if (count === 0) return 'Comentar';
  return `Ver ${count} comentario${count === 1 ? '' : 's'}`;
});

// Mock like count - replace with real data
const likeCount = computed(() => {
  return Math.floor(Math.random() * 25) + 3;
});

// Methods
function formatDate(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

  if (diffInHours < 1) return 'Hace menos de 1 hora';
  if (diffInHours < 24) return `Hace ${diffInHours} hora${diffInHours === 1 ? '' : 's'}`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `Hace ${diffInDays} día${diffInDays === 1 ? '' : 's'}`;

  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

async function fetchComments() {
  if (comments.value.length > 0) return; // Don't reload if already loaded

  loadingComments.value = true;
  try {
    const { data } = await useApiFetch(`/updates/${props.update.id}/comments`);
    if (data.value) {
      comments.value = data.value.data || [];
    }
  } catch (error) {
    console.error('Error fetching comments:', error);
  } finally {
    loadingComments.value = false;
  }
}

function handleCommentPosted() {
  // Reload comments when a new one is posted
  comments.value = [];
  fetchComments();
}

// Watch for comments toggle
watch(showComments, (newValue) => {
  if (newValue) {
    fetchComments();
  }
});
</script>

<style scoped>
/* Slide down animation for comments */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.5s ease;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-20px);
  max-height: 0;
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
  max-height: 0;
}

.slide-down-enter-to,
.slide-down-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 1000px;
}
</style>
