<template>
  <div class="min-h-screen">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <div class="mb-12 animate-fade-in-up">
        <div class="flex items-center space-x-4 mb-6">
          <div class="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center">
            <Icon name="heroicons:user-circle-20-solid" class="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 class="text-4xl font-bold text-white">Mi Perfil</h1>
            <p class="text-white/70 text-lg">Gestiona tu información y actividad</p>
          </div>
        </div>
      </div>

      <div v-if="authStore.loading || pendingStats || pendingTransactions" class="flex items-center justify-center py-20">
        <div class="text-center space-y-4">
          <GlobalSpinner variant="dance" size="lg" />
          <p class="text-white/60">Cargando tu perfil...</p>
        </div>
      </div>

      <div v-else-if="authStore.user && userStats && recentActivity" class="space-y-8">

        <div class="card-glass p-8 animate-fade-in-up delay-200">

          <div class="flex flex-col lg:flex-row lg:items-center space-y-6 lg:space-y-0 lg:space-x-8 mb-8">

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

              <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-success rounded-full border-4 border-slate-800 flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>

            <div class="flex-1 space-y-4">
              <div>
                <h2 class="text-3xl font-bold text-white mb-2">{{ authStore.user.nicename }}</h2>
                <div class="flex items-center space-x-4 text-white/70">
                  <div class="flex items-center space-x-2">
                    <Icon name="heroicons:envelope-20-solid" class="w-4 h-4" />
                    <span>{{ authStore.user.email }}</span>
                  </div>
                </div>
              </div>

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

              <div class="flex flex-wrap gap-2">
                <span class="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm border border-primary/30 flex items-center space-x-2">
                   <Icon name="heroicons:star-20-solid" class="w-4 h-4" />
                  <span>Bailarín Verificado</span>
                </span>
                <span class="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-sm border border-secondary/30 flex items-center space-x-2">
                  <Icon name="heroicons:check-badge-20-solid" class="w-4 h-4" />
                  <span>Miembro Activo</span>
                </span>
              </div>
            </div>

            <div class="flex flex-col space-y-3">
              <button class="btn-primary px-6 py-3 rounded-full flex items-center space-x-2">
                <Icon name="heroicons:pencil-square-20-solid" class="w-5 h-5"/>
                <span>Editar Perfil</span>
              </button>
              <NuxtLink to="/dashboard/wallet" class="btn-secondary px-6 py-3 rounded-full flex items-center space-x-2">
                <Icon name="heroicons:wallet-20-solid" class="w-5 h-5" />
                <span>Mi Billetera</span>
              </NuxtLink>
            </div>
          </div>

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
                    {{ formatDate(authStore.user.created) }}
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

        <div class="card-glass p-8 animate-fade-in-up delay-300">
          <h3 class="text-xl font-bold text-white mb-6 flex items-center space-x-2">
            <Icon name="heroicons:bolt-20-solid" class="w-6 h-6 text-primary" />
            <span>Actividad Reciente</span>
          </h3>

           <div v-if="!recentActivity || recentActivity.length === 0" class="text-center py-8 text-white/60">
            No hay actividad reciente para mostrar.
          </div>
          <div v-else class="space-y-4">
            <div v-for="activity in recentActivity" :key="activity.id" class="flex items-center space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0" :class="activity.iconBg">
                 <Icon :name="activity.iconName" class="w-5 h-5" :class="activity.iconColor" />
              </div>
              <div class="flex-1">
                <p class="text-white font-medium">{{ activity.title }}</p>
                <p class="text-white/60 text-sm">{{ activity.description }}</p>
              </div>
              <div class="text-white/50 text-sm whitespace-nowrap">{{ activity.time }}</div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up delay-400">
          <NuxtLink to="/events/create" class="card-glass p-6 hover:bg-white/15 transition-all duration-300 text-center group">
            <div class="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Icon name="heroicons:plus-20-solid" class="w-8 h-8 text-primary" />
            </div>
            <h4 class="text-lg font-bold text-white mb-2">Crear Evento</h4>
            <p class="text-white/70 text-sm">Organiza tu próximo evento de baile</p>
          </NuxtLink>

          <NuxtLink to="/" class="card-glass p-6 hover:bg-white/15 transition-all duration-300 text-center group">
            <div class="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
               <Icon name="heroicons:magnifying-glass-20-solid" class="w-8 h-8 text-secondary" />
            </div>
            <h4 class="text-lg font-bold text-white mb-2">Explorar Eventos</h4>
            <p class="text-white/70 text-sm">Descubre nuevos eventos para apoyar</p>
          </NuxtLink>

          <a href="#" class="card-glass p-6 hover:bg-white/15 transition-all duration-300 text-center group">
            <div class="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Icon name="heroicons:users-20-solid" class="w-8 h-8 text-accent" />
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
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '#imports';

definePageMeta({ middleware: 'auth' });
useHead({ title: 'Mi Perfil - BachataConnect' });

const authStore = useAuthStore();

// --- Data Fetching ---
const { data: statsResponse, pending: pendingStats } = await useApiFetch('/users/me/stats');
const { data: transactionsResponse, pending: pendingTransactions } = await useApiFetch('/users/me/transactions', { params: { limit: 5 } });

// --- Computed Properties for Live Data ---
const userStats = computed(() => {
  const stats = statsResponse.value?.data;
  if (!stats) {
    return { eventsCreated: 0, eventsSupported: 0, totalContributed: '$0.00' };
  }
  return {
    eventsCreated: stats.eventsAsHost?.total || 0,
    eventsSupported: stats.eventsAsParticipant?.total || 0,
    totalContributed: `$${parseFloat(stats.eventsAsParticipant?.totalContributed || 0).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  };
});

const recentActivity = computed(() => {
  const transactions = transactionsResponse.value?.data?.data;
  if (!transactions) return [];

  const iconMap = {
    DEPOSIT_JUNO: { iconName: 'heroicons:arrow-down-circle-20-solid', iconColor: 'text-success', iconBg: 'bg-success/20' },
    EVENT_CONTRIBUTION: { iconName: 'heroicons:musical-note-20-solid', iconColor: 'text-primary', iconBg: 'bg-primary/20' },
    EVENT_REFUND: { iconName: 'heroicons:receipt-refund-20-solid', iconColor: 'text-secondary', iconBg: 'bg-secondary/20' },
    HOST_PAYOUT: { iconName: 'heroicons:banknotes-20-solid', iconColor: 'text-accent', iconBg: 'bg-accent/20' },
    WITHDRAWAL_CRYPTO: { iconName: 'heroicons:arrow-up-right-20-solid', iconColor: 'text-warning', iconBg: 'bg-warning/20' }
  };

  return transactions.map(tx => {
    const amount = parseFloat(tx.amount);
    const ui = iconMap[tx.type] || iconMap.EVENT_CONTRIBUTION;
    let title = 'Movimiento en tu cuenta';
    let description = '';

    switch (tx.type) {
      case 'DEPOSIT_JUNO':
        title = 'Depósito Recibido';
        description = `Abono de $${amount.toLocaleString()} MXNB`;
        break;
      case 'EVENT_CONTRIBUTION':
        title = `Aportaste a "${tx.event?.title || 'un evento'}"`;
        description = `Contribución de $${Math.abs(amount).toLocaleString()} MXNB`;
        break;
      case 'EVENT_REFUND':
        title = `Reembolso de "${tx.event?.title || 'un evento'}"`;
        description = `Recibiste $${amount.toLocaleString()} MXNB`;
        break;
      case 'HOST_PAYOUT':
         title = `Pago de "${tx.event?.title || 'un evento'}"`;
         description = `Recibiste $${amount.toLocaleString()} MXNB como organizador`;
        break;
       case 'WITHDRAWAL_CRYPTO':
         title = 'Retiro de fondos';
         description = `Enviaste $${Math.abs(amount).toLocaleString()} MXNB a tu wallet externa`;
        break;
    }

    return {
      id: tx.id,
      title,
      description,
      time: formatTimeAgo(tx.created),
      ...ui
    };
  });
});


// --- Helper Functions ---
function formatTimeAgo(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffSeconds = Math.round((now - date) / 1000);

  if (diffSeconds < 60) return 'hace un momento';
  const diffMinutes = Math.round(diffSeconds / 60);
  if (diffMinutes < 60) return `hace ${diffMinutes} min`;
  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `hace ${diffHours} h`;
  const diffDays = Math.round(diffHours / 24);
  return `hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;
}


function formatDate(dateString) {
  if (!dateString) {
    return 'Fecha no disponible';
  }
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return 'Fecha inválida';
  }
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
</script>
