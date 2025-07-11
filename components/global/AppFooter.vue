<!-- components/global/AppFooter.vue -->
<template>
	<footer class="relative mt-20 overflow-hidden">
		<!-- Background Effects -->
		<div class="absolute inset-0">
			<!-- Gradient background -->
			<div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-purple-900/50 to-transparent"></div>

			<!-- Animated particles -->
			<div class="absolute inset-0 opacity-20">
				<div class="absolute w-64 h-64 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 blur-3xl animate-pulse top-0 left-1/4 mix-blend-multiply"></div>
				<div class="absolute w-64 h-64 rounded-full bg-gradient-to-r from-pink/30 to-accent/30 blur-3xl animate-pulse top-10 right-1/4 mix-blend-multiply delay-2000"></div>
			</div>

			<!-- Musical notes pattern -->
			<div class="absolute inset-0 opacity-5">
				<svg class="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
					<defs>
						<pattern id="footer-notes" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
							<circle cx="8" cy="8" r="1" fill="white" opacity="0.4" />
							<circle cx="22" cy="15" r="1.5" fill="white" opacity="0.3" />
							<circle cx="15" cy="25" r="1" fill="white" opacity="0.5" />
							<path d="M5 20 Q15 10 25 20" stroke="white" stroke-width="0.5" fill="none" opacity="0.3" />
						</pattern>
					</defs>
					<rect width="100%" height="100%" fill="url(#footer-notes)" />
				</svg>
			</div>
		</div>

		<!-- Main Footer Content -->
		<div class="relative z-10 glass">
			<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">

				<!-- Newsletter Section -->
				<div class="text-center mb-16">
					<div class="max-w-2xl mx-auto">
						<h3 class="text-3xl font-bold text-white mb-4">
							¡No te pierdas el <span class="text-dance-gradient">ritmo</span>!
						</h3>
						<p class="text-white/70 text-lg mb-8">
							Suscríbete para recibir las últimas novedades sobre eventos, festivales y oportunidades de financiamiento.
						</p>

						<!-- Newsletter Form -->
						<div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
							<div class="flex-1 relative group">
								<input
									type="email"
									placeholder="tu@email.com"
									class="input-glass px-6 py-4 rounded-full"
								/>
								<div class="absolute inset-y-0 right-4 flex items-center pointer-events-none">
									<svg
										class="h-5 w-5 text-white/30"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
										/>
									</svg>
								</div>
							</div>
							<button class="btn-primary px-8 py-4 rounded-full whitespace-nowrap">
								¡Suscribirme!
							</button>
						</div>
					</div>
				</div>

				<!-- Main Footer Grid -->
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

					<!-- Brand Column -->
					<div class="lg:col-span-1">
						<div class="mb-6">
							<!-- 🎨 LOGO EN FOOTER (versión clara) -->
							<img
								src="/images/logo/bachata-connect-logo.png"
								alt="BachataConnect"
								class="h-16 w-auto mb-4"
							/>
						</div>
						<p class="text-white/70 text-sm leading-relaxed mb-6">
							La plataforma líder en crowdfunding para eventos de baile latino. Conectamos bailarines, organizadores y patrocinadores en una sola comunidad vibrante.
						</p>

						<!-- Social Media -->
						<div class="flex space-x-4">
							<a
								href="#"
								class="btn-secondary w-10 h-10 rounded-full flex items-center justify-center group hover:scale-110"
							>
								<svg
									class="w-5 h-5 text-white/70 group-hover:text-white"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
								</svg>
							</a>
							<a
								href="#"
								class="btn-secondary w-10 h-10 rounded-full flex items-center justify-center group hover:scale-110"
							>
								<svg
									class="w-5 h-5 text-white/70 group-hover:text-white"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
								</svg>
							</a>
							<a
								href="#"
								class="btn-secondary w-10 h-10 rounded-full flex items-center justify-center group hover:scale-110"
							>
								<svg
									class="w-5 h-5 text-white/70 group-hover:text-white"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.739.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
								</svg>
							</a>
							<a
								href="#"
								class="btn-secondary w-10 h-10 rounded-full flex items-center justify-center group hover:scale-110"
							>
								<svg
									class="w-5 h-5 text-white/70 group-hover:text-white"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
									/>
								</svg>
							</a>
						</div>
					</div>

					<!-- Navigation Column -->
					<div>
						<h3 class="text-lg font-bold text-white mb-6">Navegación</h3>
						<ul class="space-y-4">
							<li>
								<NuxtLink
									to="/"
									class="text-white/70 hover:text-primary transition-colors duration-300 text-sm"
								>Explorar Eventos
								</NuxtLink>
							</li>
							<li>
								<NuxtLink
									to="/events/create"
									class="text-white/70 hover:text-primary transition-colors duration-300 text-sm"
								>Crear Evento
								</NuxtLink>
							</li>
							<li><a
								href="#"
								class="text-white/70 hover:text-primary transition-colors duration-300 text-sm"
							>Cómo Funciona</a></li>
							<li><a
								href="#"
								class="text-white/70 hover:text-primary transition-colors duration-300 text-sm"
							>Comunidad</a></li>
							<li><a
								href="#"
								class="text-white/70 hover:text-primary transition-colors duration-300 text-sm"
							>Blog</a></li>
						</ul>
					</div>

					<!-- Support Column -->
					<div>
						<h3 class="text-lg font-bold text-white mb-6">Soporte</h3>
						<ul class="space-y-4">
							<li><a
								href="#"
								class="text-white/70 hover:text-primary transition-colors duration-300 text-sm"
							>Centro de Ayuda</a></li>
							<li><a
								href="#"
								class="text-white/70 hover:text-primary transition-colors duration-300 text-sm"
							>Preguntas Frecuentes</a></li>
							<li><a
								href="#"
								class="text-white/70 hover:text-primary transition-colors duration-300 text-sm"
							>Contacto</a></li>
							<li><a
								href="#"
								class="text-white/70 hover:text-primary transition-colors duration-300 text-sm"
							>Reportar Problema</a></li>
							<li><a
								href="#"
								class="text-white/70 hover:text-primary transition-colors duration-300 text-sm"
							>Estado del Servicio</a></li>
						</ul>
					</div>

					<!-- Legal Column -->
					<div>
						<h3 class="text-lg font-bold text-white mb-6">Legal</h3>
						<ul class="space-y-4">
							<li><a
								href="#"
								class="text-white/70 hover:text-primary transition-colors duration-300 text-sm"
							>Términos de Servicio</a></li>
							<li><a
								href="#"
								class="text-white/70 hover:text-primary transition-colors duration-300 text-sm"
							>Política de Privacidad</a></li>
							<li><a
								href="#"
								class="text-white/70 hover:text-primary transition-colors duration-300 text-sm"
							>Cookies</a></li>
							<li><a
								href="#"
								class="text-white/70 hover:text-primary transition-colors duration-300 text-sm"
							>Política de Reembolsos</a></li>
							<li><a
								href="#"
								class="text-white/70 hover:text-primary transition-colors duration-300 text-sm"
							>Compliance</a></li>
						</ul>
					</div>
				</div>

				<!-- Stats Section -->
				<div class="border-t border-white/10 pt-12 mb-12">
					<div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
						<div class="group">
							<div class="text-3xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
								1,247
							</div>
							<div class="text-text-muted text-sm">Bailarines Activos</div>
						</div>
						<div class="group">
							<div class="text-3xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
								89
							</div>
							<div class="text-text-muted text-sm">Eventos Financiados</div>
						</div>
						<div class="group">
							<div class="text-3xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
								$2.4M
							</div>
							<div class="text-text-muted text-sm">Total Recaudado</div>
						</div>
						<div class="group">
							<div class="text-3xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
								15
							</div>
							<div class="text-text-muted text-sm">Países</div>
						</div>
					</div>
				</div>

				<!-- Bottom Section -->
				<div class="border-t border-white/10 pt-8">
					<div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
						<div class="text-text-muted text-sm">
							&copy; 2025 BachataConnect. Todos los derechos reservados.
						</div>

						<div class="flex items-center space-x-6 text-sm text-text-muted">
							<span class="flex items-center space-x-2">
								<span class="w-2 h-2 bg-success rounded-full animate-pulse"></span>
								<span>Todos los sistemas operativos</span>
							</span>
							<span>•</span>
							<span>Hecho con ❤️ para la comunidad latina</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Bottom gradient fade -->
		<div class="h-8 bg-gradient-to-b from-transparent to-slate-900"></div>
	</footer>
</template>

<script setup>
	// No JavaScript adicional necesario
</script>
