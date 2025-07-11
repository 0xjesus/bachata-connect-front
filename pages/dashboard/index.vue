<!-- pages/dashboard/index.vue -->
<template>
  <div class="min-h-screen">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <!-- Page Header -->
      <div class="mb-12 animate-fade-in-up">
        <div class="flex items-center space-x-4 mb-6">
          <div class="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center">
            <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-4xl font-bold text-white">Mi Perfil</h1>
            <p class="text-white/70 text-lg">Gestiona tu información y actividad</p>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="authStore.loading" class="flex items-center justify-center py-20">
        <div class="text-center space-y-4">
          <div class="w-16 h-16 border-4 border-white/20 border-t-primary rounded-full animate-spin mx-auto"></div>
          <p class="text-white/60">Cargando tu perfil...</p>
        </div>
      </div>

      <!-- Profile Content -->
      <div v-else-if="authStore.user" class="space-y-8">

        <!-- Main Profile Card -->
        <div class="card-glass p-8 animate-fade-in-up delay-200">

          <!-- Profile Header -->
          <div class="flex flex-col lg:flex-row lg:items-center space-y-6 lg:space-y-0 lg:space-x-8 mb-8">

            <!-- Avatar Section -->
            <div class="relative">
              <div class="w-32 h-32 rounded-full bg-primary/20 border-4 border-primary/50 flex items-center justify-center overflow-hidden">
                <img
                  v-if="authStore.user.metas?.profile_picture_url"
                  :src="authStore.user.metas.profile_picture_url"
                  :alt="authStore.user.nicename"
                  class="w-full h-full object-cover"
                />
                <svg v-else class="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>

              <!-- Status Indicator -->
              <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-success rounded-full border-4 border-slate-800 flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>

            <!-- Profile Info -->
            <div class="flex-1 space-y-4">
              <div>
                <h2 class="text-3xl font-bold text-white mb-2">{{ authStore.user.nicename }}</h2>
                <div class="flex items-center space-x-4 text-white/70">
                  <div class="flex items-center space-x-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                    </svg>
                    <span>{{ authStore.user.email }}</span>
                  </div>
                </div>
              </div>

              <!-- User Stats -->
              <div class="grid grid-cols-3 gap-6">
                <div class="text-center">
                  <div class="text-2xl font-bold text-primary">{{ userStats.eventsCreated }}</div>
                  <div class="text-white/60 text-sm">Eventos creados</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-secondary">{{ userStats.eventsSupported }}</div>
                  <div class="text-white/60 text-sm">Eventos apoyados</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-accent">{{ userStats.totalContributed }}</div>
                  <div class="text-white/60 text-sm">Total aportado</div>
                </div>
              </div>

              <!-- Badges -->
              <div class="flex flex-wrap gap-2">
                <span class="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm border border-primary/30 flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span>Bailarín Verificado</span>
                </span>
                <span class="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-sm border border-secondary/30 flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>Miembro Activo</span>
                </span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col space-y-3">
              <button class="btn-primary px-6 py-3 rounded-full flex items-center space-x-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
                <span>Editar Perfil</span>
              </button>
              <NuxtLink to="/dashboard/wallet" class="btn-secondary px-6 py-3 rounded-full flex items-center space-x-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                </svg>
                <span>Mi Billetera</span>
              </NuxtLink>
            </div>
          </div>

          <!-- Account Details -->
          <div class="pt-8 border-t border-white/10">
            <h3 class="text-xl font-bold text-white mb-6">Detalles de la Cuenta</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-semibold text-white/70 mb-1">Nombre de Usuario</label>
                  <div class="input-glass px-4 py-3 bg-white/5 cursor-not-allowed">
                    {{ authStore.user.nicename }}
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-semibold text-white/70 mb-1">Correo Electrónico</label>
                  <div class="input-glass px-4 py-3 bg-white/5 cursor-not-allowed">
                    {{ authStore.user.email }}
                  </div>
                </div>
              </div>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-semibold text-white/70 mb-1">Miembro desde</label>
                  <div class="input-glass px-4 py-3 bg-white/5 cursor-not-allowed">
                    {{ formatDate(authStore.user.registered) }}
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-semibold text-white/70 mb-1">Estado de la cuenta</label>
                  <div class="input-glass px-4 py-3 bg-white/5 cursor-not-allowed flex items-center space-x-2">
                    <span class="w-2 h-2 bg-success rounded-full"></span>
                    <span>Activa y verificada</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="card-glass p-8 animate-fade-in-up delay-300">
          <h3 class="text-xl font-bold text-white mb-6 flex items-center space-x-2">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            <span>Actividad Reciente</span>
          </h3>

          <div class="space-y-4">
            <div v-for="activity in recentActivity" :key="activity.id" class="flex items-center space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div class="w-10 h-10 rounded-full flex items-center justify-center" :class="activity.iconBg">
                <svg class="w-5 h-5" :class="activity.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="activity.iconPath"/>
                </svg>
              </div>
              <div class="flex-1">
                <p class="text-white font-medium">{{ activity.title }}</p>
                <p class="text-white/60 text-sm">{{ activity.description }}</p>
              </div>
              <div class="text-white/50 text-sm">{{ activity.time }}</div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up delay-400">
          <NuxtLink to="/events/create" class="card-glass p-6 hover:bg-white/15 transition-all duration-300 text-center group">
            <div class="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
            </div>
            <h4 class="text-lg font-bold text-white mb-2">Crear Evento</h4>
            <p class="text-white/70 text-sm">Organiza tu próximo evento de baile</p>
          </NuxtLink>

          <NuxtLink to="/" class="card-glass p-6 hover:bg-white/15 transition-all duration-300 text-center group">
            <div class="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <h4 class="text-lg font-bold text-white mb-2">Explorar Eventos</h4>
            <p class="text-white/70 text-sm">Descubre nuevos eventos para apoyar</p>
          </NuxtLink>

          <a href="#" class="card-glass p-6 hover:bg-white/15 transition-all duration-300 text-center group">
            <div class="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <h4 class="text-lg font-bold text-white mb-2">Comunidad</h4>
            <p class="text-white/70 text-sm">Conecta con otros bailarines</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ middleware: 'auth' });
const authStore = useAuthStore();

// Mock user stats - replace with real data
const userStats = ref({
  eventsCreated: 3,
  eventsSupported: 12,
  totalContributed: '$2,450'
});

// Mock recent activity - replace with real data
const recentActivity = ref([
  {
    id: 1,
    title: 'Apoyaste "Festival de Bachata 2025"',
    description: 'Contribución de $250',
    time: 'hace 2 horas',
    iconBg: 'bg-success/20',
    iconColor: 'text-success',
    iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    id: 2,
    title: 'Creaste un nuevo evento',
    description: '"Social de Salsa en la Playa" está en revisión',
    time: 'ayer',
    iconBg: 'bg-primary/20',
    iconColor: 'text-primary',
    iconPath: 'M12 4v16m8-8H4'
  },
  {
    id: 3,
    title: 'Actualización de perfil',
    description: 'Agregaste una foto de perfil',
    time: 'hace 3 días',
    iconBg: 'bg-secondary/20',
    iconColor: 'text-secondary',
    iconPath: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
  }
]);

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

useHead({ title: 'Mi Perfil - BachataConnect' });
</script>
