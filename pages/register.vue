<template>
	<div class="min-h-screen relative overflow-hidden">
		<!-- Animated Background -->
		<div class="absolute inset-0 bg-brand-gradient-reverse">
			<!-- Dancing particles animation -->
			<div class="absolute inset-0 opacity-20">
				<div class="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 blur-3xl animate-pulse top-10 -left-20 mix-blend-multiply"></div>
				<div class="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 blur-3xl animate-pulse top-40 -right-20 mix-blend-multiply delay-2000"></div>
				<div class="absolute w-96 h-96 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 blur-3xl animate-pulse bottom-10 left-1/2 transform -translate-x-1/2 mix-blend-multiply delay-4000"></div>
			</div>

			<!-- Geometric patterns -->
			<div class="absolute inset-0 opacity-10">
				<svg class="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
					<defs>
						<pattern id="register-notes" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
							<circle cx="6" cy="8" r="1" fill="white" opacity="0.4" />
							<circle cx="18" cy="12" r="1.5" fill="white" opacity="0.3" />
							<circle cx="12" cy="20" r="1" fill="white" opacity="0.5" />
							<path d="M3 15 Q12 8 21 15" stroke="white" stroke-width="0.5" fill="none" opacity="0.3" />
						</pattern>
					</defs>
					<rect width="100%" height="100%" fill="url(#register-notes)" />
				</svg>
			</div>
		</div>

		<!-- Main Content -->
		<div class="relative z-10 flex items-center justify-center min-h-screen p-4">
			<div class="w-full max-w-lg">
				<!-- 🎨 LOGO CHINGÓN EN LUGAR DEL ÍCONO -->
				<div class="text-center mb-8 animate-fade-in-up">
					<img
						src="/images/logo/bachata-connect-logo.png"
						alt="BachataConnect"
						class="h-20 w-auto mx-auto mb-4"
					/>
					<h1 class="text-3xl font-bold text-white mb-2 tracking-tight">
						¡Únete a la Comunidad!
					</h1>
					<p class="text-white/80 text-lg font-medium">Donde cada bailarín encuentra su escenario</p>
				</div>

				<!-- 🎨 Register Card CON IMAGEN DE FONDO CHINGONA -->
				<div class="relative overflow-hidden rounded-2xl animate-fade-in-up delay-200">
					<!-- IMAGEN DE FONDO DE LA CARD - COMMUNITY CELEBRATION -->
					<div
						class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-12"
						style="background-image: url('/images/auth/community-celebration.png')"
					></div>

					<!-- Overlay para legibilidad -->
					<div class="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"></div>

					<!-- CONTENIDO DE LA CARD -->
					<div class="relative z-10 card-glass backdrop-blur-xs border border-white/30">
						<div class="text-center mb-8">
							<h2 class="text-3xl font-bold text-white mb-2">Crea tu Cuenta</h2>
							<p class="text-white/90 text-base">Empieza tu viaje en la comunidad más vibrante</p>
						</div>

						<AuthRegisterForm />
					</div>
				</div>

				<!-- Login Link -->
				<div class="text-center mt-6 animate-fade-in-up delay-400">
					<p class="text-white/80">
						¿Ya tienes cuenta?
						<NuxtLink
							to="/login"
							class="font-bold text-primary hover:text-secondary transition-all duration-300 ml-2 underline decoration-2 underline-offset-4 decoration-primary/50 hover:decoration-secondary"
						>
							Inicia sesión aquí →
						</NuxtLink>
					</p>
				</div>

				<!-- Benefits -->
				<div class="mt-8 animate-fade-in-up delay-500">
					<div class="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
						<div class="glass-intense rounded-xl p-4">
							<div class="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
								<svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
									/>
								</svg>
							</div>
							<h3 class="text-white font-semibold text-sm mb-1">Comunidad Global</h3>
							<p class="text-white/60 text-xs">Conecta con bailarines de todo el mundo</p>
						</div>

						<div class="glass-intense rounded-xl p-4">
							<div class="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
								<svg
									class="w-6 h-6 text-secondary"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
									/>
								</svg>
							</div>
							<h3 class="text-white font-semibold text-sm mb-1">Financia Eventos</h3>
							<p class="text-white/60 text-xs">Apoya y crea eventos únicos</p>
						</div>

						<div class="glass-intense rounded-xl p-4">
							<div class="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
								<svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M13 10V3L4 14h7v7l9-11h-7z"
									/>
								</svg>
							</div>
							<h3 class="text-white font-semibold text-sm mb-1">Crecimiento</h3>
							<p class="text-white/60 text-xs">Desarrolla tu pasión profesionalmente</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Floating Elements -->
		<div class="absolute top-20 left-10 w-4 h-4 bg-primary rounded-full animate-float delay-1000"></div>
		<div class="absolute top-32 right-20 w-3 h-3 bg-secondary rounded-full animate-float delay-2000"></div>
		<div class="absolute bottom-40 left-20 w-5 h-5 bg-purple rounded-full animate-float delay-3000"></div>
		<div class="absolute bottom-20 right-10 w-3 h-3 bg-pink rounded-full animate-float delay-4000"></div>
	</div>
</template>

<script setup>
	useHead({
		title: 'Crear Cuenta - BachataConnect',
		meta: [
			{
				name: 'description',
				content: 'Únete a BachataConnect y forma parte de la comunidad de baile más vibrante del mundo',
			},
		],
	});
</script>
