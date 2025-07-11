<!-- layouts/default.vue -->
<template>
	<div class="min-h-screen text-white font-sans relative overflow-x-hidden">
		<!-- Global Background Effects -->
		<div class="fixed inset-0 pointer-events-none z-0">
			<img
				src="/images/patterns/dance-texture.png"
				alt=""
				class="absolute inset-0 w-full h-full object-cover opacity-5"
			/>
			<!-- Animated gradient mesh -->
			<div class="absolute inset-0 opacity-30">
				<div class="absolute w-96 h-96 rounded-full bg-gradient-to-r from-accent/20 to-pink/20 blur-3xl animate-pulse top-0 left-0 mix-blend-multiply"></div>
				<div class="absolute w-96 h-96 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl animate-pulse top-1/3 right-0 mix-blend-multiply delay-2000"></div>
				<div class="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue/20 to-purple/20 blur-3xl animate-pulse bottom-0 left-1/3 mix-blend-multiply delay-4000"></div>
			</div>

			<!-- Geometric pattern overlay -->
			<div class="absolute inset-0 opacity-5">
				<svg class="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
					<defs>
						<pattern id="dance-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
							<circle cx="10" cy="10" r="2" fill="white" opacity="0.3" />
							<circle cx="30" cy="20" r="1.5" fill="white" opacity="0.2" />
							<circle cx="20" cy="30" r="1" fill="white" opacity="0.4" />
							<path d="M5 35 Q20 25 35 35" stroke="white" stroke-width="0.5" fill="none" opacity="0.2" />
						</pattern>
					</defs>
					<rect width="100%" height="100%" fill="url(#dance-pattern)" />
				</svg>
			</div>
		</div>

		<!-- Header -->
		<AppHeader />

		<!-- Main Content Area -->
		<main class="relative z-10 flex-grow">
			<!-- Content Container -->
			<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<!-- Page transition wrapper -->
				<div class="min-h-[calc(100vh-200px)]">
					<slot />
				</div>
			</div>
		</main>

		<!-- Footer -->
		<AppFooter />

		<!-- Floating Action Elements -->
		<div class="fixed bottom-8 right-8 z-50 space-y-4">
			<!-- Create Event FAB -->
			<NuxtLink to="/events/create" class="group">
				<div class="relative">
					<button class="btn-primary p-4 rounded-full shadow-brand-lg hover:shadow-brand group-hover:rotate-12 animate-glow">
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
						</svg>
					</button>

					<!-- Tooltip -->
					<div class="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
						<div class="glass text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap">
							Crear Evento
							<div class="absolute top-1/2 left-full transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-white/20 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
						</div>
					</div>
				</div>
			</NuxtLink>

			<!-- Scroll to top button (appears when scrolled) -->
			<Transition name="fade">
				<button
					v-if="showScrollTop"
					@click="scrollToTop"
					class="btn-secondary p-3 rounded-full"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 10l7-7m0 0l7 7m-7-7v18"
						/>
					</svg>
				</button>
			</Transition>
		</div>
	</div>
</template>

<script setup>
	const showScrollTop = ref(false);

	// Scroll to top functionality
	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}

	// Show/hide scroll to top button
	function handleScroll() {
		showScrollTop.value = window.scrollY > 500;
	}

	onMounted(() => {
		window.addEventListener('scroll', handleScroll);
	});

	onUnmounted(() => {
		window.removeEventListener('scroll', handleScroll);
	});
</script>

<style scoped>
	/* Transitions */
	.fade-enter-active, .fade-leave-active {
		transition: opacity 0.3s ease;
	}

	.fade-enter-from, .fade-leave-to {
		opacity: 0;
	}

	.loading-enter-active, .loading-leave-active {
		transition: opacity 0.5s ease;
	}

	.loading-enter-from, .loading-leave-to {
		opacity: 0;
	}
</style>
