<template>
	<header class="relative z-50">
		<nav
			class="fixed top-0 left-0 right-0 glass transition-all duration-300"
			:class="{ 'glass-intense shadow-xl': isScrolled }"
		>
			<div class="container mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex justify-between items-center h-16 lg:h-20">

					<NuxtLink
						to="/"
						class="group flex items-center space-x-2 lg:space-x-3 transition-all duration-300 hover:scale-105"
					>
						<div class="relative">
							<div class="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-brand-gradient flex items-center justify-center shadow-xl group-hover:animate-glow transition-all duration-300 group-hover:rotate-12">
								<img
									src="/images/logo/bachata-connect-logo.png"
									alt="BachataConnect"
									class="h-10 lg:h-12 w-auto transition-all duration-300 group-hover:scale-110"
								/>
							</div>
						</div>
						<div class="hidden sm:block" :class="{ 'xl:block hidden': authStore.isAuthenticated }">
							<h1 class="text-xl lg:text-2xl font-bold leading-tight">
								<span class="text-brand-gradient">Bachata</span><span class="text-white">Connect</span>
							</h1>
							<p class="text-xs text-white/60 font-medium hidden lg:block">Financia tu pasión</p>
						</div>
					</NuxtLink>

					<div class="hidden lg:flex items-center space-x-6 xl:space-x-8">
						<div class="flex items-center space-x-4 xl:space-x-6">
							<NuxtLink
								to="/"
								class="nav-link group"
								:class="{ 'active text-brand-gradient': $route.path === '/' }"
							>
								<Icon name="heroicons:calendar-days-20-solid" />
								<span>Eventos</span>
							</NuxtLink>
							<NuxtLink
								to="/events/create"
								class="nav-link group"
								:class="{ 'active text-brand-gradient': $route.path === '/events/create' }"
							>
								<Icon name="heroicons:plus-circle-20-solid" />
								<span>Crear Evento</span>
							</NuxtLink>
							<a href="#" class="nav-link group">
								<Icon name="heroicons:users-20-solid" />
								<span>Comunidad</span></a>
						</div>
					</div>

					<div class="flex items-center space-x-2 lg:space-x-4">
						<div v-if="authStore.loading" class="flex items-center space-x-2">
							<div class="w-8 h-8 rounded-full bg-white/20 animate-pulse"></div>
							<div class="hidden lg:block w-20 h-4 bg-white/20 rounded animate-pulse"></div>
						</div>

						<div
							v-else-if="authStore.isAuthenticated && authStore.user"
							class="flex items-center space-x-3"
						>
							<NuxtLink
								to="/dashboard/wallet"
								class="hidden lg:flex items-center space-x-2 glass-intense px-4 py-2 rounded-full hover:bg-success/20 group transition-all duration-300"
							>
								<Icon
									name="heroicons:wallet-20-solid"
									class="w-5 h-5 text-success/80 group-hover:text-success"
								/>
								<span class="font-bold text-white">{{ formatMoney(authStore.user.balance.available) }}
									<span class="text-success/80 group-hover:text-success font-normal">MXNB</span></span>
							</NuxtLink>
							<button class="relative p-2 text-white/70 hover:text-white transition-all duration-300 group hover:scale-110">
								<Icon
									name="heroicons:bell-20-solid"
									class="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
								/>
								<span class="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-800 animate-ping"></span>
							</button>
							<div class="relative group">
								<button class="flex items-center space-x-2 hover:scale-105 transition-transform duration-200">
									<div class="relative">
										<img
											v-if="authStore.user?.metas?.profile_picture_url"
											:src="authStore.user.metas.profile_picture_url"
											:alt="authStore.user.nicename"
											class="w-10 h-10 rounded-full object-cover border-2 border-white/30 group-hover:border-primary transition-all duration-300"
										/>
										<div
											v-else
											class="w-10 h-10 rounded-full bg-brand-gradient border-2 border-white/30 group-hover:border-primary transition-all duration-300 flex items-center justify-center"
										>
											<Icon name="heroicons:user-20-solid" class="w-5 h-5 text-white" />
										</div>
										<div class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-slate-800"></div>
									</div>
									<Icon
										name="heroicons:chevron-down-20-solid"
										class="w-5 h-5 text-white/50 group-hover:text-white transition-colors duration-300 hidden lg:block"
									/>
								</button>

								<div class="absolute right-0 top-full mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
									<div class="glass-intense rounded-2xl shadow-xl overflow-hidden">
										<div class="p-4 border-b border-white/10 bg-dance-gradient">
											<p class="text-white font-semibold truncate">{{ authStore.user.nicename }}</p>
											<p class="text-white/60 text-sm truncate">{{ authStore.user.email }}</p>
										</div>
										<div class="p-2">
											<NuxtLink to="/dashboard" class="dropdown-link group">
												<Icon
													name="heroicons:user-circle-20-solid"
													class="dropdown-icon text-blue-400"
												/>
												<span>Mi Perfil</span></NuxtLink>
											<NuxtLink to="/dashboard/my-events" class="dropdown-link group">
												<Icon
													name="heroicons:calendar-days-20-solid"
													class="dropdown-icon text-primary"
												/>
												<span>Mis Eventos</span></NuxtLink>
											<NuxtLink to="/dashboard/wallet" class="dropdown-link group">
												<Icon
													name="heroicons:wallet-20-solid"
													class="dropdown-icon text-success"
												/>
												<span>Mi Billetera</span></NuxtLink>
											<div class="border-t border-white/10 my-2"></div>
											<button
												@click="authStore.logout()"
												class="w-full dropdown-link group text-red-300 hover:!bg-red-500/10 hover:!text-red-200"
											>
												<Icon
													name="heroicons:arrow-left-on-rectangle-20-solid"
													class="dropdown-icon"
												/>
												<span>Cerrar Sesión</span>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div v-else class="flex items-center space-x-2 lg:space-x-3">
							<NuxtLink to="/login" class="btn-secondary px-3 lg:px-4 py-2 text-sm lg:text-base"><span
								class="hidden sm:inline"
							>Iniciar Sesión</span><span class="sm:hidden">Login</span></NuxtLink>
							<NuxtLink to="/register" class="btn-primary px-4 lg:px-6 py-2 text-sm lg:text-base"><span
								class="hidden sm:inline"
							>¡Únete!</span><span class="sm:hidden">Join</span></NuxtLink>
						</div>

						<button
							@click="showMobileMenu = !showMobileMenu"
							class="lg:hidden btn-secondary p-2 rounded-full ml-2 hover:scale-110"
						>
							<Icon v-if="!showMobileMenu" name="heroicons:bars-3-20-solid" class="w-5 h-5" />
							<Icon v-else name="heroicons:x-mark-20-solid" class="w-5 h-5" />
						</button>
					</div>
				</div>

				<Transition name="mobile-menu">
					<div v-if="showMobileMenu" class="lg:hidden py-4 border-t border-white/10">
						<div class="space-y-1 px-2">
							<NuxtLink to="/" @click="showMobileMenu = false" class="nav-link-mobile group">
								<Icon name="heroicons:calendar-days-20-solid" />
								<span>Eventos</span></NuxtLink>
							<NuxtLink to="/events/create" @click="showMobileMenu = false" class="nav-link-mobile group">
								<Icon name="heroicons:plus-circle-20-solid" />
								<span>Crear Evento</span></NuxtLink>
							<a href="#" @click="showMobileMenu = false" class="nav-link-mobile group">
								<Icon name="heroicons:users-20-solid" />
								<span>Comunidad</span></a>
						</div>
					</div>
				</Transition>
			</div>
		</nav>
		<div class="h-16 lg:h-20"></div>
	</header>
</template>

<script setup>
	import { ref, watch } from 'vue';
	import { useRoute } from 'vue-router';
	import { useAuthStore } from '#imports';

	const authStore = useAuthStore();
	const showMobileMenu = ref(false);
	const isScrolled = ref(false);
	const route = useRoute();

	const formatMoney = (amount) => {
		return parseFloat(amount || 0).toLocaleString('es-MX', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	};

	function handleScroll() {
		isScrolled.value = window.scrollY > 50;
	}

	onMounted(() => {
		window.addEventListener('scroll', handleScroll);
	});

	onUnmounted(() => {
		window.removeEventListener('scroll', handleScroll);
	});

	watch(() => route.path, () => {
		showMobileMenu.value = false;
	});
</script>

<style scoped>
	/* SE HAN ELIMINADO LOS USOS DE 'group' DENTRO DE @apply */
	.nav-link {
		@apply flex items-center space-x-2 px-3 py-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 font-semibold;
	}

	.nav-link.active {
		@apply bg-white/10;
	}

	.nav-link > svg {
		@apply w-5 h-5 group-hover:scale-110 transition-transform duration-300;
	}

	.nav-link-mobile {
		@apply flex items-center space-x-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 font-semibold;
	}

	.dropdown-link {
		@apply w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300;
	}

	.dropdown-icon {
		@apply w-5 h-5 group-hover:scale-110 transition-transform duration-300;
	}

	.mobile-menu-enter-active, .mobile-menu-leave-active {
		transition: all 0.3s ease-in-out;
	}

	.mobile-menu-enter-from, .mobile-menu-leave-to {
		opacity: 0;
		transform: translateY(-20px);
	}
</style>
