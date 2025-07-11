<template>
	<div class="min-h-screen">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div class="mb-12 animate-fade-in-up">
				<div class="flex items-center space-x-4 mb-6">
					<div class="w-16 h-16 rounded-full bg-success/20 border-2 border-success/50 flex items-center justify-center">
						<svg class="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
							/>
						</svg>
					</div>
					<div>
						<h1 class="text-4xl font-bold text-white">Mi Billetera</h1>
						<p class="text-white/70 text-lg">Gestiona tus fondos y transacciones</p>
					</div>
				</div>
			</div>

			<div v-if="authStore.loading" class="flex items-center justify-center py-20">
				<div class="text-center space-y-4">
					<div class="w-16 h-16 border-4 border-white/20 border-t-success rounded-full animate-spin mx-auto"></div>
					<p class="text-white/60">Cargando tu información financiera...</p>
				</div>
			</div>

			<div v-else-if="authStore.user" class="space-y-8">
				<div class="card-glass p-8 relative overflow-hidden animate-fade-in-up delay-200">
					<div class="absolute top-0 right-0 w-64 h-64 bg-success/10 rounded-full blur-3xl opacity-50"></div>
					<div class="relative z-10">
						<div class="text-center mb-8">
							<div class="flex items-center justify-center space-x-2 mb-3">
								<Icon name="heroicons:banknotes-20-solid" class="w-6 h-6 text-success" />
								<h2 class="text-lg font-semibold text-white/90">Balance Disponible</h2>
								<button @click="authStore.fetchUser()" class="ml-2 p-1 hover:bg-white/10 rounded-full">
									<Icon name="heroicons:arrow-path-20-solid" class="w-4 h-4 text-white/60" />
								</button>
							</div>

							<div class="space-y-2">
								<template v-if="balance">
									<div class="text-6xl font-bold text-success animate-glow">
										${{ formatMoney(balance.available) }}
									</div>
									<div class="flex items-center justify-center space-x-2 text-white/60">
										<span class="text-lg font-medium">{{ balance?.currency || 'MXNB' }}</span>
										<span>•</span>
										<div class="flex items-center space-x-1">
											<span
												class="w-2 h-2 rounded-full"
												:class="getBalanceStatusColor(balance)"
											></span>
											<span class="text-sm">{{ getBalanceStatusText(balance) }}</span>
										</div>
									</div>
									<div class="text-xs text-white/50 mt-2 space-y-1">
										<div>Total: ${{ formatMoney(balance.total) }}</div>
										<div v-if="parseFloat(balance.locked || 0) > 0">
											Bloqueado: ${{ formatMoney(balance.locked) }}
										</div>
										<div>Actualizado: {{ formatLastUpdate(balance.lastUpdated) }}</div>
									</div>
								</template>
								<template v-else>
									<div class="text-center">
										<img
											src="/images/dashboard/digital-wallet.png"
											alt="Digital Wallet"
											class="w-24 h-24 mx-auto mb-4 opacity-70"
										/>
										<div class="text-4xl font-bold text-warning">$0.00</div>
									</div>
								</template>
							</div>
						</div>

						<div class="grid grid-cols-3 gap-6">
							<div class="text-center p-4 rounded-xl bg-white/5">
								<div class="text-2xl font-bold text-primary mb-1">${{ stats.totalDeposited }}</div>
								<div class="text-white/60 text-sm">Total depositado</div>
							</div>
							<div class="text-center p-4 rounded-xl bg-white/5">
								<div class="text-2xl font-bold text-secondary mb-1">{{ stats.totalTransactions }}</div>
								<div class="text-white/60 text-sm">Transacciones</div>
							</div>
							<div class="text-center p-4 rounded-xl bg-white/5">
								<div class="text-2xl font-bold text-accent mb-1">{{ stats.eventsSupported }}</div>
								<div class="text-white/60 text-sm">Eventos apoyados</div>
							</div>
						</div>
						<div class="mt-6 flex justify-center">
							<button
								@click="fundAccount"
								:disabled="fundingAccount"
								class="btn-primary px-6 py-3 text-lg font-semibold flex items-center space-x-2"
							>
								<Icon
									name="heroicons:plus-circle-20-solid"
									class="w-5 h-5"
									:class="{ 'animate-spin': fundingAccount }"
								/>
								<span>{{ fundingAccount ? 'Fondeando...' : 'Fondear $500 MXN' }}</span>
							</button>
						</div>
					</div>
				</div>

				<div class="card-glass p-8 animate-fade-in-up delay-300">
					<CryptoManager />
				</div>

				<div class="card-glass p-8 animate-fade-in-up delay-400">
					<div class="flex items-center justify-between mb-6">
						<h2 class="text-2xl font-bold text-white flex items-center space-x-3">
							<Icon name="heroicons:clipboard-document-list-20-solid" class="w-6 h-6 text-primary" />
							<span>Historial de Transacciones</span>
						</h2>
						<button
							@click="fetchTransactions"
							:disabled="loadingTransactions"
							class="btn-secondary px-4 py-2 text-sm"
						>
							<Icon
								name="heroicons:arrow-path-20-solid"
								class="w-4 h-4 mr-2"
								:class="{ 'animate-spin': loadingTransactions }"
							/>
							Actualizar
						</button>
					</div>

					<div v-if="loadingTransactions" class="text-center py-12">
						<GlobalSpinner variant="dance" size="lg" center />
					</div>
					<div v-else-if="transactions.length > 0" class="space-y-4">
						<div
							v-for="tx in transactions"
							:key="tx.id"
							class="flex items-center space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
						>
							<div
								class="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
								:class="getTransactionUIAttributes(tx.type).bg"
							>
								<Icon
									:name="getTransactionUIAttributes(tx.type).icon"
									class="w-6 h-6"
									:class="getTransactionUIAttributes(tx.type).color"
								/>
							</div>
							<div class="flex-1">
								<div class="flex items-center justify-between">
									<h4 class="font-bold text-white">{{ getTransactionUIAttributes(tx.type).title }}</h4>
									<div class="text-right">
										<div class="font-bold" :class="tx.amount > 0 ? 'text-success' : 'text-white'">
											{{ formatTransactionAmount(tx) }}
										</div>
										<div class="text-white/50 text-xs">{{ formatTransactionDate(tx.created) }}</div>
									</div>
								</div>
								<p class="text-white/60 text-sm">{{ tx.description }}</p>
							</div>
						</div>
					</div>
					<div v-else class="text-center py-12">
						<div class="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
							<Icon name="heroicons:document-magnifying-glass-20-solid" class="w-8 h-8 text-primary" />
						</div>
						<h4 class="text-lg font-bold text-white mb-2">Sin transacciones aún</h4>
						<p class="text-white/60">Tus movimientos aparecerán aquí.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
	definePageMeta({ middleware: 'auth' });
	const authStore = useAuthStore();
	// --- STATE ---
	const loadingTransactions = ref(false);
	const transactions = ref([]);
	const fundingAccount = ref(false);

	// --- COMPUTED PROPERTIES ---
	const balance = computed(() => authStore.user?.balance || null);

	const stats = computed(() => {
		const deposits = transactions.value.filter(t => t.type === 'DEPOSIT_JUNO');
		const totalDeposited = deposits.reduce((sum, t) => sum + parseFloat(t.amount), 0);
		const eventsSupported = transactions.value.filter(t => t.type === 'EVENT_CONTRIBUTION').length;

		return {
			totalDeposited: totalDeposited.toFixed(2),
			totalTransactions: transactions.value.length,
			eventsSupported,
		};
	});

	// --- METHODS ---
	async function fetchTransactions() {
		if(!authStore.user) return;
		loadingTransactions.value = true;
		try {
			const { data, error } = await useApiFetch('/users/me/transactions');
			if(error.value) {
				console.error('❌ Error cargando transacciones:', error.value);
				transactions.value = [];
			} else {
				transactions.value = data.value?.data?.data || [];
			}
		} catch(e) {
			console.error('Exception cargando transacciones:', e);
		} finally {
			loadingTransactions.value = false;
		}
	}

	async function fundAccount() {
		fundingAccount.value = true;
		try {
			const { data, error } = await useApiFetch('/users/me/fund', {
				method: 'POST',
				body: { amount: 500, currency: 'MXNB' },
			});

			if(error.value) {
				console.error('❌ Error fondeando cuenta:', error.value);
				// Aquí puedes agregar notificación de error
			} else {
				console.log('✅ Cuenta fondeada exitosamente');
				// Refrescar el balance del usuario
				await authStore.fetchUser();
				// Refrescar transacciones
				await fetchTransactions();
				// Aquí puedes agregar notificación de éxito
			}
		} catch(e) {
			console.error('Exception fondeando cuenta:', e);
		} finally {
			fundingAccount.value = false;
		}
	}

	// --- UI HELPER FUNCTIONS ---

	function formatMoney(amount) {
		return parseFloat(amount || 0).toLocaleString('es-MX', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	}

	function formatLastUpdate(timestamp) {
		if(!timestamp) return '';
		const date = new Date(timestamp);
		return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
	}

	function getBalanceStatusText(bal) {
		if(!bal) return 'Sin Conexión';
		return bal.source === 'internal_ledger' ? 'Balance Interno' : 'Estado Desconocido';
	}

	function getBalanceStatusColor(bal) {
		if(!bal) return 'bg-gray-500';
		return bal.source === 'internal_ledger' ? 'bg-success' : 'bg-warning';
	}

	function getTransactionUIAttributes(type) {
		const map = {
			DEPOSIT_JUNO: {
				title: 'Depósito Recibido',
				icon: 'heroicons:arrow-down-circle-20-solid',
				color: 'text-success',
				bg: 'bg-success/20',
			},
			EVENT_CONTRIBUTION: {
				title: 'Aporte a Evento',
				icon: 'heroicons:musical-note-20-solid',
				color: 'text-primary',
				bg: 'bg-primary/20',
			},
			EVENT_REFUND: {
				title: 'Reembolso Recibido',
				icon: 'heroicons:receipt-refund-20-solid',
				color: 'text-secondary',
				bg: 'bg-secondary/20',
			},
			HOST_PAYOUT: {
				title: 'Pago de Evento',
				icon: 'heroicons:banknotes-20-solid',
				color: 'text-accent',
				bg: 'bg-accent/20',
			},
			WITHDRAWAL_CRYPTO: {
				title: 'Retiro Crypto',
				icon: 'heroicons:arrow-up-right-20-solid',
				color: 'text-warning',
				bg: 'bg-warning/20',
			},
		};
		return map[type] || {
			title: type,
			icon: 'heroicons:question-mark-circle-20-solid',
			color: 'text-white',
			bg: 'bg-white/20',
		};
	}

	function formatTransactionAmount(transaction) {
		const amount = parseFloat(transaction.amount);
		const prefix = amount >= 0 ? '+' : '';
		return `${ prefix }$${ formatMoney(amount) } ${ transaction.currency }`;
	}

	function formatTransactionDate(dateString) {
		const date = new Date(dateString);
		const now = new Date();
		const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
		if(diffDays === 0) return 'Hoy';
		if(diffDays === 1) return 'Ayer';
		if(diffDays < 7) return `Hace ${ diffDays } días`;
		return date.toLocaleDateString('es-ES');
	}

	// --- LIFECYCLE ---
	onMounted(() => {
		if(authStore.isAuthenticated) {
			fetchTransactions();
		}
	});

	watch(() => authStore.user, (newUser) => {
		if(newUser) {
			fetchTransactions();
		} else {
			transactions.value = [];
		}
	}, { immediate: true });

	useHead({ title: 'Mi Billetera - BachataConnect' });
</script>
