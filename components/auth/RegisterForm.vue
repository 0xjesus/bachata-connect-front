<!-- components/auth/RegisterForm.vue - SOLO CAMBIAR EL SCRIPT -->
<template>
	<form @submit.prevent="handleRegister" class="space-y-6">
		<!-- Username Input -->
		<div class="group">
			<label
				for="nicename"
				class="block text-sm font-semibold text-white/90 mb-2 group-focus-within:text-primary transition-colors duration-300"
			>
				Nombre de Usuario
			</label>
			<div class="relative">
				<div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
					<svg
						class="h-5 w-5 text-white/50 group-focus-within:text-primary transition-colors duration-300"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
						/>
					</svg>
				</div>
				<input
					id="nicename"
					v-model="userInfo.nicename"
					type="text"
					placeholder="Tu Apodo"
					required
					autocomplete="username"
					class="input-glass pl-12 pr-4 py-4 text-lg hover:bg-white/15"
				/>
			</div>
		</div>

		<!-- Email Input -->
		<div class="group">
			<label
				for="email"
				class="block text-sm font-semibold text-white/90 mb-2 group-focus-within:text-primary transition-colors duration-300"
			>
				Correo Electrónico
			</label>
			<div class="relative">
				<div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
					<svg
						class="h-5 w-5 text-white/50 group-focus-within:text-primary transition-colors duration-300"
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
				<input
					id="email"
					v-model="userInfo.email"
					type="email"
					placeholder="tu@email.com"
					required
					autocomplete="email"
					class="input-glass pl-12 pr-4 py-4 text-lg hover:bg-white/15"
				/>
			</div>
		</div>

		<!-- Password Input -->
		<div class="group">
			<label
				for="password"
				class="block text-sm font-semibold text-white/90 mb-2 group-focus-within:text-primary transition-colors duration-300"
			>
				Contraseña
			</label>
			<div class="relative">
				<div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
					<svg
						class="h-5 w-5 text-white/50 group-focus-within:text-primary transition-colors duration-300"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
						/>
					</svg>
				</div>
				<input
					id="password"
					v-model="userInfo.password"
					:type="showPassword ? 'text' : 'password'"
					placeholder="Mínimo 8 caracteres"
					required
					autocomplete="new-password"
					class="input-glass pl-12 pr-12 py-4 text-lg hover:bg-white/15"
				/>
				<button
					type="button"
					@click="showPassword = !showPassword"
					class="absolute inset-y-0 right-0 pr-4 flex items-center text-white/50 hover:text-primary transition-colors duration-300"
				>
					<svg v-if="!showPassword" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
						/>
					</svg>
					<svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
						/>
					</svg>
				</button>
			</div>

			<!-- Password Strength Indicator -->
			<div class="mt-2">
				<div class="flex space-x-1">
					<div
						v-for="i in 4"
						:key="i"
						class="h-1.5 flex-1 rounded-full transition-all duration-300"
						:class="getPasswordStrengthColor(i)"
					></div>
				</div>
				<p class="text-xs text-white/60 mt-1">{{ passwordStrengthText }}</p>
			</div>
		</div>

		<!-- Confirm Password Input -->
		<div class="group">
			<label
				for="passwordConfirm"
				class="block text-sm font-semibold text-white/90 mb-2 group-focus-within:text-primary transition-colors duration-300"
			>
				Confirmar Contraseña
			</label>
			<div class="relative">
				<div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
					<svg
						class="h-5 w-5 text-white/50 group-focus-within:text-primary transition-colors duration-300"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<input
					id="passwordConfirm"
					v-model="userInfo.passwordConfirm"
					:type="showPasswordConfirm ? 'text' : 'password'"
					placeholder="Repite tu contraseña"
					required
					autocomplete="new-password"
					class="input-glass pl-12 pr-12 py-4 text-lg hover:bg-white/15"
					:class="{ 'border-success/50': passwordsMatch && userInfo.passwordConfirm, 'border-error/50': !passwordsMatch && userInfo.passwordConfirm }"
				/>
				<button
					type="button"
					@click="showPasswordConfirm = !showPasswordConfirm"
					class="absolute inset-y-0 right-0 pr-4 flex items-center text-white/50 hover:text-primary transition-colors duration-300"
				>
					<svg
						v-if="!showPasswordConfirm"
						class="h-5 w-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
						/>
					</svg>
					<svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
						/>
					</svg>
				</button>
			</div>

			<!-- Password Match Indicator -->
			<div v-if="userInfo.passwordConfirm" class="mt-2 flex items-center space-x-2">
				<svg
					v-if="passwordsMatch"
					class="h-4 w-4 text-success"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
				</svg>
				<svg v-else class="h-4 w-4 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
				<span class="text-xs" :class="passwordsMatch ? 'text-success' : 'text-error'">
					{{ passwordsMatch ? 'Las contraseñas coinciden' : 'Las contraseñas no coinciden' }}
				</span>
			</div>
		</div>

		<!-- Terms and Privacy -->
		<div class="flex items-start space-x-3">
			<input
				v-model="acceptTerms"
				type="checkbox"
				id="terms"
				class="checkbox-custom mt-1"
				required
			/>
			<label for="terms" class="text-sm text-white/80 leading-relaxed cursor-pointer">
				Acepto los
				<a
					href="#"
					class="text-primary hover:text-secondary underline decoration-2 underline-offset-2"
				>Términos de Servicio</a>
				y la
				<a
					href="#"
					class="text-primary hover:text-secondary underline decoration-2 underline-offset-2"
				>Política de Privacidad</a>
			</label>
		</div>

		<!-- Error Message -->
		<div v-if="error" class="relative">
			<div class="glass bg-error/20 border border-error/30 rounded-xl p-4 animate-shake">
				<div class="flex items-center space-x-3">
					<svg
						class="h-5 w-5 text-red-300 flex-shrink-0"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<p class="text-red-200 font-medium">{{ error }}</p>
				</div>
			</div>
		</div>

		<!-- Success Message -->
		<div v-if="success" class="relative">
			<div class="glass bg-success/20 border border-success/30 rounded-xl p-4 animate-fade-in-up">
				<div class="flex items-center space-x-3">
					<svg
						class="h-5 w-5 text-green-300 flex-shrink-0"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<p class="text-green-200 font-medium">{{ success }}</p>
				</div>
			</div>
		</div>

		<!-- Submit Button -->
		<div class="pt-2">
			<button
				type="submit"
				:disabled="loading || !acceptTerms || !passwordsMatch"
				class="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
			>
				<!-- Loading Spinner -->
				<svg
					v-if="loading"
					class="animate-spin h-6 w-6 mr-3 text-white"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>

				<!-- Button Text -->
				<span v-if="!loading" class="flex items-center justify-center space-x-2">
					<span>¡Únete a la Pista!</span>
					<svg
						class="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 7l5 5m0 0l-5 5m5-5H6"
						/>
					</svg>
				</span>
				<span v-else>Creando tu cuenta...</span>
			</button>
		</div>

		<!-- Social Registration -->
		<div class="relative">
			<div class="absolute inset-0 flex items-center">
				<div class="w-full border-t border-white/20"></div>
			</div>
			<div class="relative flex justify-center text-sm">
				<span class="px-4 bg-transparent text-white/60 font-medium">o regístrate con</span>
			</div>
		</div>

		<div class="grid grid-cols-2 gap-4">
			<button
				type="button"
				class="btn-secondary py-3 px-4 group"
			>
				<svg
					class="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300"
					viewBox="0 0 24 24"
					fill="currentColor"
				>
					<path
						d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
						fill="#4285F4"
					/>
					<path
						d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
						fill="#34A853"
					/>
					<path
						d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
						fill="#FBBC05"
					/>
					<path
						d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
						fill="#EA4335"
					/>
				</svg>
				<span class="font-medium">Google</span>
			</button>

			<button
				type="button"
				class="btn-secondary py-3 px-4 group"
			>
				<svg
					class="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
				</svg>
				<span class="font-medium">Facebook</span>
			</button>
		</div>
	</form>
</template>

<script setup>
	const authStore = useAuthStore();
	const router = useRouter(); // 👈 AGREGAMOS ESTO

	const userInfo = ref({ nicename: '', email: '', password: '', passwordConfirm: '' });
	const loading = ref(false);
	const error = ref('');
	const success = ref('');
	const acceptTerms = ref(false);
	const showPassword = ref(false);
	const showPasswordConfirm = ref(false);

	// Password validation
	const passwordStrength = computed(() => {
		const password = userInfo.value.password;
		let strength = 0;

		if(password.length >= 8) strength++;
		if(/[A-Z]/.test(password)) strength++;
		if(/[0-9]/.test(password)) strength++;
		if(/[^A-Za-z0-9]/.test(password)) strength++;

		return strength;
	});

	const passwordStrengthText = computed(() => {
		const strength = passwordStrength.value;
		const texts = [ 'Muy débil', 'Débil', 'Buena', 'Fuerte' ];
		return texts[strength - 1] || 'Muy débil';
	});

	const passwordsMatch = computed(() => {
		return userInfo.value.password === userInfo.value.passwordConfirm;
	});

	function getPasswordStrengthColor(index) {
		const strength = passwordStrength.value;
		if(index <= strength) {
			if(strength === 1) return 'bg-red-500';
			if(strength === 2) return 'bg-yellow-500';
			if(strength === 3) return 'bg-blue-500';
			if(strength === 4) return 'bg-green-500';
		}
		return 'bg-white/20';
	}

	// 🔥 AQUÍ ESTÁ EL CAMBIO PRINCIPAL
	async function handleRegister() {
		if(userInfo.value.password !== userInfo.value.passwordConfirm) {
			error.value = 'Las contraseñas no coinciden.';
			return;
		}

		if(!acceptTerms.value) {
			error.value = 'Debes aceptar los términos y condiciones.';
			return;
		}

		loading.value = true;
		error.value = '';
		success.value = '';

		try {
			// 1. Primero registrar al usuario
			const registerResponse = await authStore.register(userInfo.value);
			console.log('✅ Usuario registrado:', registerResponse);

			// 2. Inmediatamente hacer login automático
			const loginData = {
				email: userInfo.value.email, // o username si prefieres
				password: userInfo.value.password,
			};

			const loginResponse = await authStore.login(loginData);
			console.log('✅ Login automático exitoso:', loginResponse);

			// 3. Mostrar mensaje de éxito
			alert('¡Cuenta creada y sesión iniciada! ¡Bienvenido a BachataConnect! 🎉');

			// 4. Redireccionar al dashboard
			await router.push('/dashboard');

		} catch(e) {
			console.error('❌ Error en registro/login:', e);

			// Si falló el registro, mostrar error
			if(e.message.includes('register') || e.message.includes('exist')) {
				error.value = e.message;
			} else {
				// Si el registro fue exitoso pero falló el login automático,
				// aún mostrar un mensaje de éxito parcial
				success.value = 'Cuenta creada exitosamente. Por favor, inicia sesión manualmente.';
				// Reset form
				userInfo.value = { nicename: '', email: '', password: '', passwordConfirm: '' };
				acceptTerms.value = false;
			}
		} finally {
			loading.value = false;
		}
	}
</script>

<style scoped>
	/* Custom checkbox usando las variables globales */
	.checkbox-custom {
		appearance: none;
		width: 1rem;
		height: 1rem;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-radius: 0.25rem;
		background: var(--glass-bg);
		backdrop-filter: blur(10px);
		position: relative;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.checkbox-custom:checked {
		background: rgb(var(--color-primary));
		border-color: rgb(var(--color-primary));
	}

	.checkbox-custom:checked::after {
		content: '✓';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: white;
		font-size: 0.75rem;
		font-weight: bold;
	}

	.checkbox-custom:hover {
		border-color: rgb(var(--color-primary) / 0.5);
		background: rgba(255, 255, 255, 0.15);
	}
</style>
