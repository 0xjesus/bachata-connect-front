<template>
	<div class="min-h-screen relative overflow-hidden">
		<!-- Animated Background -->
		<div class="absolute inset-0 bg-brand-gradient">
			<!-- Dancing particles animation -->
			<div class="absolute inset-0 opacity-20">
				<div class="absolute w-96 h-96 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 blur-3xl animate-pulse top-10 -left-20 mix-blend-multiply"></div>
				<div class="absolute w-96 h-96 rounded-full bg-gradient-to-r from-pink-400 to-red-500 blur-3xl animate-pulse top-40 -right-20 mix-blend-multiply delay-2000"></div>
				<div class="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 blur-3xl animate-pulse bottom-10 left-1/2 transform -translate-x-1/2 mix-blend-multiply delay-4000"></div>
			</div>

			<!-- Geometric patterns -->
			<div class="absolute inset-0 opacity-10">
				<svg class="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
					<defs>
						<pattern id="music-notes" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
							<circle cx="5" cy="10" r="1" fill="white" opacity="0.3" />
							<circle cx="15" cy="5" r="1" fill="white" opacity="0.3" />
							<circle cx="10" cy="15" r="1" fill="white" opacity="0.3" />
						</pattern>
					</defs>
					<rect width="100%" height="100%" fill="url(#music-notes)" />
				</svg>
			</div>
		</div>

		<!-- Main Content -->
		<div class="relative z-10 flex items-center justify-center min-h-screen p-4">
			<div class="w-full max-w-md">
				<!-- 🎨 LOGO CHINGÓN EN LUGAR DEL ÍCONO -->
				<div class="text-center mb-8 animate-fade-in-up">
					<img
						src="/images/logo/bachata-connect-logo.png"
						alt="BachataConnect"
						class="w-auto mx-auto mb-4 h-20"
					/>
					<p class="text-white/80 text-lg font-medium">Donde la música encuentra su financiación</p>
				</div>

				<!-- 🎨 Login Card CON IMAGEN DE FONDO ARREGLADA -->
				<div class="relative overflow-hidden rounded-2xl animate-fade-in-up delay-200">
					<!-- IMAGEN DE FONDO DE LA CARD - RUTA CORREGIDA -->
					<div
						class="absolute inset-0 bg-cover bg-center bg-no-repeat"
						style="background-image: url('/images/auth/dance-silhouette.png')"
					></div>

					<!-- Overlay para legibilidad -->

					<!-- CONTENIDO DE LA CARD -->
					<div class="relative z-10 card-glass backdrop-blur-0 border border-white/30">
						<div class="text-center mb-8">
							<h2 class="text-3xl font-bold text-white mb-2">¡Bienvenido de Vuelta!</h2>
							<p class="text-white/90 text-base">Conecta con la comunidad de baile más vibrante</p>
						</div>

						<AuthLoginForm />
					</div>
				</div>

				<!-- Register Link -->
				<div class="text-center mt-6 animate-fade-in-up delay-400">
					<p class="text-white/80">
						¿Primera vez aquí?
						<NuxtLink
							to="/register"
							class="font-bold text-primary hover:text-secondary transition-all duration-300 ml-2 underline decoration-2 underline-offset-4 decoration-primary/50 hover:decoration-secondary"
						>
							Únete a la fiesta →
						</NuxtLink>
					</p>
				</div>

				<!-- Social Proof -->
				<div class="text-center mt-8 animate-fade-in-up delay-500">
					<div class="flex items-center justify-center space-x-4 text-white/60 text-sm">
						<div class="flex items-center space-x-1">
							<span class="w-2 h-2 bg-success rounded-full animate-pulse"></span>
							<span>1,247 bailarines activos</span>
						</div>
						<div class="w-px h-4 bg-white/30"></div>
						<div class="flex items-center space-x-1">
							<span class="w-2 h-2 bg-primary rounded-full animate-pulse delay-1000"></span>
							<span>89 eventos financiados</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Floating Elements -->
		<div class="absolute top-20 left-10 w-4 h-4 bg-primary rounded-full animate-float delay-1000"></div>
		<div class="absolute top-32 right-20 w-3 h-3 bg-pink rounded-full animate-float delay-2000"></div>
		<div class="absolute bottom-40 left-20 w-5 h-5 bg-blue rounded-full animate-float delay-3000"></div>
		<div class="absolute bottom-20 right-10 w-3 h-3 bg-secondary rounded-full animate-float delay-4000"></div>
	</div>
</template>

<script setup>
	useHead({
		title: 'Iniciar Sesión - BachataConnect',
		meta: [
			{
				name: 'description',
				content: 'Inicia sesión en BachataConnect y conecta con la comunidad de baile más vibrante del mundo',
			},
		],
	});
</script>
