// pages/index.vue
<template>
	<div>
		<section class="relative h-96 mb-16 rounded-3xl overflow-hidden">
			<img
				src="/images/hero/dance-banner.png"
				alt="BachataConnect Community"
				class="absolute inset-0 w-full h-full object-cover"
			/>
			<div class="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-pink-900/80"></div>
			<div class="relative z-10 flex items-center justify-center h-full text-center">
				<div>
					<h1 class="text-5xl font-bold text-white mb-4">Financia tu Pasión por el Baile</h1>
					<p class="text-xl text-white/90">Conecta, crea y celebra la cultura latina</p>
				</div>
			</div>
		</section>
		<div class="text-center mb-12">
			<h1 class="text-4xl md:text-5xl font-extrabold mb-3">Eventos de la Comunidad</h1>
			<p class="text-lg text-gray-600">Descubre, participa y financia los mejores eventos de bachata.</p>
		</div>

		<div v-if="pending" class="flex justify-center items-center h-64">
			<UiSpinner class="w-12 h-12 text-primary" />
		</div>

		<div v-else-if="error" class="text-center text-red-500 bg-red-100 p-4 rounded-lg">
			<p class="font-bold">¡Oops! Algo salió mal.</p>
			<p>No se pudieron cargar los eventos. Por favor, intenta de nuevo más tarde.</p>
		</div>

		<div
			v-else-if="events && events.length > 0"
			class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
		>
			<EventCard v-for="event in events" :key="event.id" :event="event" />
		</div>

		<div v-else class="text-center py-16">
			<p class="text-2xl font-semibold text-gray-500">No hay eventos activos.</p>
			<p class="text-gray-400 mt-2">¿Por qué no creas el tuyo?</p>
			<NuxtLink to="/events/create">
				<UiButton class="mt-4">Crear un Evento</UiButton>
			</NuxtLink>
		</div>
	</div>
</template>

<script setup>
	const { data: response, pending, error } = await useApiFetch('/events/public');
	const events = computed(() => response.value?.data || []);
	useHead({ title: 'Explora Eventos - BachataConnect' });
</script>
