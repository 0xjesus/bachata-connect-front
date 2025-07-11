<!-- components/event/Comment.vue -->
<template>
  <div class="group flex items-start space-x-3 animate-fade-in-up">

    <!-- User Avatar -->
    <div class="relative flex-shrink-0">
      <img
        :src="comment.author.metas?.profile_picture_url || `https://picsum.photos/32/32?random=${comment.author.id}`"
        :alt="comment.author.nicename"
        class="w-10 h-10 rounded-full object-cover border-2 border-white/20 group-hover:border-primary/50 transition-all duration-300"
      />
      <!-- Online indicator -->
      <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-slate-800"></div>
    </div>

    <!-- Comment Content -->
    <div class="flex-1 min-w-0">
      <div class="glass rounded-2xl p-4 relative overflow-hidden group-hover:bg-white/15 transition-all duration-300">

        <!-- Background decoration -->
        <div class="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <!-- Comment Header -->
        <div class="flex items-center justify-between mb-2 relative z-10">
          <div class="flex items-center space-x-2">
            <h4 class="font-bold text-white text-sm group-hover:text-primary transition-colors duration-300">
              {{ comment.author.nicename }}
            </h4>

            <!-- User badge (if premium, verified, etc.) -->
            <span class="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full border border-primary/30">
              ✨ Bailarín
            </span>
          </div>

          <!-- Timestamp -->
          <div class="flex items-center space-x-1 text-white/50">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <time class="text-xs font-medium">
              {{ formatTime(comment.created) }}
            </time>
          </div>
        </div>

        <!-- Comment Text -->
        <div class="relative z-10">
          <p class="text-white/90 text-sm leading-relaxed">
            {{ comment.content }}
          </p>
        </div>

        <!-- Comment Actions -->
        <div class="flex items-center justify-between mt-3 pt-3 border-t border-white/10 relative z-10">
          <div class="flex items-center space-x-4">

            <!-- Like button -->
            <button class="flex items-center space-x-1 text-white/60 hover:text-primary transition-colors duration-300 group/like">
              <svg class="w-4 h-4 group-hover/like:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              <span class="text-xs font-medium">{{ likeCount }}</span>
            </button>

            <!-- Reply button -->
            <button class="flex items-center space-x-1 text-white/60 hover:text-secondary transition-colors duration-300 group/reply">
              <svg class="w-4 h-4 group-hover/reply:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
              </svg>
              <span class="text-xs font-medium">Responder</span>
            </button>
          </div>

          <!-- More options -->
          <button class="text-white/40 hover:text-white/70 transition-colors duration-300">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  comment: { type: Object, required: true }
});

// Mock like count - replace with real data
const likeCount = computed(() => {
  return Math.floor(Math.random() * 20) + 1;
});

function formatTime(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));

  if (diffInMinutes < 1) return 'ahora';
  if (diffInMinutes < 60) return `${diffInMinutes}min`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d`;

  return date.toLocaleDateString('es-ES', {
    month: 'short',
    day: 'numeric'
  });
}
</script>
