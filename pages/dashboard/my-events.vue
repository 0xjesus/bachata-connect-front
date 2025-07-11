<template>
	<div class="min-h-screen">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div class="mb-12 animate-fade-in-up">
				<div class="flex items-center space-x-4 mb-6">
					<div class="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center">
						<Icon name="heroicons:calendar-days-20-solid" class="w-8 h-8 text-primary" />
					</div>
					<div>
						<h1 class="text-4xl font-bold text-white">Mis Eventos Creados</h1>
						<p class="text-white/70 text-lg">Gestiona y sigue el progreso de tus eventos.</p>
					</div>
				</div>
			</div>

			<div v-if="pending" class="flex justify-center items-center h-64">
				<GlobalSpinner variant="dance" size="lg" />
			</div>

			<div v-else-if="error" class="text-center text-red-500 bg-red-100/10 p-6 rounded-lg">
				<p class="font-bold text-lg">¡Oops! Algo salió mal.</p>
				<p>No se pudieron cargar tus eventos. Por favor, intenta de nuevo más tarde.</p>
			</div>

			<div
				v-else-if="myEvents && myEvents.length > 0"
				class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
			>
				<EventCard v-for="event in myEvents" :key="event.id" :event="event" />
			</div>

			<div v-else class="text-center py-16 card-glass">
				<img
					src="/images/dashboard/create-first-event.png"
					alt="Create your first event"
					class="w-32 h-32 mx-auto mb-6 opacity-80"
				/>
				<p class="text-2xl font-semibold text-white">Aún no has creado ningún evento.</p>
				<p class="text-white/60 mt-2">¡Es hora de dar vida a tu idea!</p>
				<NuxtLink to="/events/create">
					<button class="btn-primary mt-6 px-6 py-3">Crear mi Primer Evento</button>
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script setup>
	definePageMeta({ middleware: 'auth' });
	useHead({ title: 'Mis Eventos - BachataConnect' });

	const { data: response, pending, error } = await useApiFetch('/events/my-events');

	const myEvents = computed(() => response.value?.data || []);
</script>
