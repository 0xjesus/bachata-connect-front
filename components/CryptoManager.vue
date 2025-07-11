<template>
	<div class="card-glass p-6 sm:p-8 space-y-8 animate-fade-in-up">
		<div class="border-b border-white/10 flex space-x-2 sm:space-x-4">
			<button
				v-for="tab in tabs"
				:key="tab.id"
				@click="activeTab = tab.id"
				:class="[
     'flex items-center space-x-2 px-3 sm:px-4 py-3 text-sm sm:text-base font-bold transition-all duration-300',
     activeTab === tab.id
      ? 'border-b-2 border-primary text-primary'
      : 'text-white/60 hover:text-white hover:bg-white/5 rounded-t-lg',
    ]"
			>
				<Icon :name="tab.icon" class="w-5 h-5" />
				<span>{{ tab.name }}</span>
			</button>
		</div>

		<div class="transition-all duration-500 min-h-[300px]">
			<section v-if="activeTab === 'wallet'" class="space-y-6">
				<h3 class="text-xl font-bold text-white flex items-center space-x-3">
					<Icon name="heroicons:qr-code-20-solid" class="text-primary" />
					<span>Mi Wallet Personal</span>
				</h3>

				<div v-if="!hasWallet && !isGeneratingWallet" class="text-center card-glass p-8">
					<div class="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
						<Icon name="heroicons:question-mark-circle-20-solid" class="w-8 h-8 text-primary" />
					</div>
					<h4 class="text-lg font-bold text-white mb-2">Aún no tienes una wallet</h4>
					<p class="text-white/70 mb-6">Genera una wallet segura para poder recibir pagos de tus eventos.</p>
					<button @click="handleGenerateWallet" :disabled="isGeneratingWallet" class="btn-primary px-6 py-3">
						<GlobalSpinner v-if="isGeneratingWallet" size="sm" class="mr-2" />
						<span>{{ isGeneratingWallet ? 'Generando...' : 'Generar Mi Wallet Segura' }}</span>
					</button>
				</div>

				<div v-else-if="hasWallet" class="space-y-6">
					<div class="card-glass p-6 rounded-xl">
						<label class="block text-sm font-semibold text-white/70 mb-2">Tu Dirección Pública (Address)</label>
						<div class="flex items-center space-x-4 bg-black/20 p-4 rounded-lg">
							<code class="text-primary font-mono flex-1 break-all">{{ authStore.user.walletAddress }}</code>
							<button
								@click="copyToClipboard(authStore.user.walletAddress, 'Dirección pública copiada!')"
								class="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full"
							>
								<Icon name="heroicons:clipboard-document-20-solid" class="w-5 h-5" />
							</button>
						</div>
						<p class="text-xs text-white/60 mt-2">Esta es tu dirección pública. Puedes compartirla de forma segura para recibir fondos.</p>
					</div>

					<div class="card-glass p-6 rounded-xl border border-error/30">
						<label class="block text-sm font-semibold text-error mb-2">Tu Clave Privada</label>
						<div class="bg-error/10 p-4 rounded-lg space-y-4">
							<p class="text-sm text-red-200">
								<span class="font-bold">¡ADVERTENCIA!</span> Tu clave privada controla todos tus fondos. NUNCA la compartas con nadie. Guárdala en un lugar seguro y sin conexión.
							</p>
							<div v-if="!showPrivateKey">
								<button
									@click="handleRevealPrivateKey"
									:disabled="isFetchingPrivateKey"
									class="btn-secondary bg-error/20 hover:bg-error/30 text-white px-4 py-2"
								>
									<GlobalSpinner v-if="isFetchingPrivateKey" size="sm" class="mr-2" />
									<span>{{ isFetchingPrivateKey ? 'Obteniendo...' : 'Revelar Clave Privada' }}</span>
								</button>
							</div>
							<div v-else class="flex items-center space-x-4 bg-black/20 p-4 rounded-lg">
								<code class="text-error font-mono flex-1 break-all">{{ privateKey }}</code>
								<button
									@click="copyToClipboard(privateKey, 'Clave privada copiada. ¡Guárdala bien!')"
									class="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full"
								>
									<Icon name="heroicons:clipboard-document-20-solid" class="w-5 h-5" />
								</button>
							</div>
						</div>
					</div>
				</div>

				<div v-else-if="isGeneratingWallet">
					<GlobalSpinner center size="lg" label="Generando tu wallet..." />
				</div>
			</section>

			<section v-if="activeTab === 'withdraw'" class="space-y-6">
				<h3 class="text-xl font-bold text-white flex items-center space-x-3">
					<Icon name="heroicons:arrow-up-right-20-solid" class="text-primary" />
					<span>Retirar Fondos (MXNB)</span>
				</h3>
				<form @submit.prevent="handleWithdraw" class="space-y-6">
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label
								for="address"
								class="block text-sm font-semibold text-white/90 mb-2"
							>Dirección de Destino</label>
							<select
								id="address"
								v-model="withdrawalRequest.addressId"
								class="input-glass"
								:disabled="addresses.length === 0"
							>
								<option
									:value="null"
									disabled
								>{{ addresses.length > 0 ? 'Selecciona una dirección' : 'Añade una dirección primero' }}</option>
								<option
									v-for="addr in addresses"
									:key="addr.id"
									:value="addr.id"
								>{{ addr.label }} ({{ addr.address.slice(0, 6) }}...{{ addr.address.slice(-4) }})</option>
							</select>
						</div>
						<div>
							<label
								for="amount"
								class="block text-sm font-semibold text-white/90 mb-2"
							>Monto a Retirar</label>
							<div class="relative">
								<input
									id="amount"
									v-model.number="withdrawalRequest.amount"
									type="number"
									placeholder="0.00"
									required
									min="1"
									step="any"
									class="input-glass pl-4 pr-16"
								/>
								<span class="absolute inset-y-0 right-4 flex items-center text-white/60 font-bold">MXNB</span>
							</div>
						</div>
					</div>
					<div class="card-glass p-4 rounded-xl space-y-4">
						<div class="flex justify-between items-center text-sm">
							<span class="text-white/70">Tu Saldo Disponible:</span>
							<span class="font-bold text-primary">{{ formatMoney(authStore.user?.balance?.available || 0) }} MXNB</span>
						</div>
						<div
							v-if="withdrawalRequest.amount > 0"
							class="flex justify-between items-center font-bold text-lg pt-2 border-t border-white/10"
						>
							<span class="text-white">Recibirás:</span>
							<span class="text-success">{{ formatMoney(withdrawalRequest.amount) }} MXNB</span>
						</div>
					</div>
					<button type="submit" :disabled="isSubmittingWithdrawal" class="btn-primary w-full py-3">
						<GlobalSpinner v-if="isSubmittingWithdrawal" size="sm" class="mr-2" />
						<span>{{ isSubmittingWithdrawal ? 'Procesando Retiro...' : 'Confirmar Retiro' }}</span>
					</button>
					<p v-if="successMessage" class="text-center text-success font-medium">{{ successMessage }}</p>
					<p v-if="errorMessage" class="text-center text-error font-medium">{{ errorMessage }}</p>
				</form>
			</section>

			<section v-if="activeTab === 'addresses'" class="space-y-6">
				<h3 class="text-xl font-bold text-white flex items-center space-x-3">
					<Icon name="heroicons:wallet-20-solid" class="text-primary" />
					<span>Mis Direcciones Crypto</span>
				</h3>
				<div class="space-y-3">
					<p
						v-if="addresses.length === 0 && !loadingAddresses"
						class="text-center text-white/60 py-4"
					>No tienes direcciones guardadas.</p>
					<GlobalSpinner v-if="loadingAddresses" center />
					<transition-group name="list" tag="div" class="space-y-3">
						<div
							v-for="addr in addresses"
							:key="addr.id"
							class="glass-intense p-4 rounded-lg flex items-center justify-between"
						>
							<div class="flex items-center space-x-4">
								<div class="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
									<Icon name="heroicons:globe-alt" class="w-5 h-5 text-primary" />
								</div>
								<div>
									<p class="font-bold text-white">{{ addr.label }}</p>
									<p class="text-sm text-white/70 font-mono">{{ addr.address.slice(0, 10) }}...{{ addr.address.slice(-8) }}</p>
								</div>
							</div>
							<button
								@click="handleDeleteAddress(addr.id)"
								class="p-2 text-white/50 hover:text-error hover:bg-error/20 rounded-full"
							>
								<Icon name="heroicons:trash-20-solid" class="w-5 h-5" />
							</button>
						</div>
					</transition-group>
				</div>
				<div class="pt-6 border-t border-white/10">
					<form @submit.prevent="handleAddAddress" class="space-y-4">
						<h4 class="font-bold text-white">Añadir Nueva Dirección</h4>
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
							<input
								v-model="newAddress.label"
								class="input-glass"
								placeholder="Etiqueta (Ej: Mi Metamask)"
								required
							/>
							<input
								v-model="newAddress.address"
								class="input-glass"
								placeholder="Dirección 0x..."
								required
							/>
						</div>
						<button type="submit" :disabled="isAddingAddress" class="btn-secondary py-2 px-4">
							<GlobalSpinner v-if="isAddingAddress" size="xs" class="mr-2" />
							{{ isAddingAddress ? 'Guardando...' : 'Añadir Dirección' }}
						</button>
					</form>
				</div>
			</section>

			<section v-if="activeTab === 'history'" class="space-y-6">
				<h3 class="text-xl font-bold text-white flex items-center space-x-3">
					<Icon name="heroicons:clock-20-solid" class="text-primary" />
					<span>Historial de Retiros</span>
				</h3>
				<GlobalSpinner v-if="loadingWithdrawals" center />
				<p
					v-if="withdrawals.length === 0 && !loadingWithdrawals"
					class="text-center text-white/60 py-4"
				>Aún no has realizado retiros.</p>
				<div v-else class="space-y-2">
					<div
						v-for="tx in withdrawals"
						:key="tx.id"
						class="glass-intense p-4 rounded-lg flex items-center justify-between"
					>
						<div class="flex items-center space-x-4">
							<div
								class="w-10 h-10 rounded-full flex items-center justify-center"
								:class="getStatusColor(tx.status).bg"
							>
								<Icon
									:name="getStatusIcon(tx.status)"
									class="w-5 h-5"
									:class="getStatusColor(tx.status).text"
								/>
							</div>
							<div>
								<p class="font-bold text-white">Retiro a {{ tx.destinationAddress.slice(0, 6) }}...{{ tx.destinationAddress.slice(-4) }}</p>
								<p class="text-sm text-white/60">{{ formatDate(tx.created) }}</p>
							</div>
						</div>
						<div class="text-right">
							<p class="font-bold text-white">-{{ formatMoney(tx.amount) }} {{ tx.asset }}</p>
							<span
								class="px-2 py-1 text-xs rounded-full"
								:class="getStatusColor(tx.status).text + ' ' + getStatusColor(tx.status).bg"
							>{{ tx.status }}</span>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script setup>
	import { useAuthStore } from '#imports';

	const authStore = useAuthStore();
	const activeTab = ref('wallet');

	const tabs = [
		{ id: 'wallet', name: 'Mi Wallet', icon: 'heroicons:qr-code-20-solid' },
		{ id: 'withdraw', name: 'Retirar', icon: 'heroicons:arrow-up-right-20-solid' },
		{ id: 'addresses', name: 'Direcciones', icon: 'heroicons:wallet-20-solid' },
		{ id: 'history', name: 'Historial', icon: 'heroicons:clock-20-solid' },
	];

	const addresses = ref([]);
	const withdrawals = ref([]);
	const newAddress = ref({ label: '', address: '' });
	const withdrawalRequest = ref({ addressId: null, amount: '' });

	const loadingAddresses = ref(false);
	const loadingWithdrawals = ref(false);
	const isAddingAddress = ref(false);
	const isSubmittingWithdrawal = ref(false);
	const errorMessage = ref('');
	const successMessage = ref('');

	const isGeneratingWallet = ref(false);
	const isFetchingPrivateKey = ref(false);
	const showPrivateKey = ref(false);
	const privateKey = ref('');
	const hasWallet = computed(() => !!authStore.user?.walletAddress);

	async function fetchAddresses() {
		loadingAddresses.value = true;
		try {
			const { data } = await useApiFetch('/crypto/addresses');
			addresses.value = data.value?.data || [];
		} finally {
			loadingAddresses.value = false;
		}
	}

	async function fetchWithdrawals() {
		loadingWithdrawals.value = true;
		try {
			const { data } = await useApiFetch('/crypto/withdrawals');
			withdrawals.value = data.value?.data || [];
		} finally {
			loadingWithdrawals.value = false;
		}
	}

	 async function handleAddAddress() {
        isAddingAddress.value = true;
        clearMessages();
        try {
            const { data: newAddressData, error } = await useApiFetch('/crypto/addresses', {
                method: 'POST',
                body: { ...newAddress.value, blockchain: 'ARBITRUM' },
            });

            if (error.value) {
                throw error.value;
            }

            newAddress.value = { label: '', address: '' };
            alert('Dirección añadida con éxito');
            await fetchAddresses();

            if (newAddressData.value?.data?.id) {
                withdrawalRequest.value.addressId = newAddressData.value.data.id;
            }
        } catch (e) {
            const message = e.data?.message || e.message || 'Error al añadir dirección.';
            errorMessage.value = message;
            alert(`Error: ${message}`);
        } finally {
            isAddingAddress.value = false;
        }
    }

	async function handleDeleteAddress(addressId) {
		if(!confirm('¿Estás seguro de que quieres eliminar esta dirección?')) return;
		clearMessages();
		try {
			await useApiFetch(`/crypto/addresses/${ addressId }`, { method: 'DELETE' });
			alert('Dirección eliminada');
			addresses.value = addresses.value.filter(a => a.id !== addressId);
		} catch(e) {
			errorMessage.value = e.data?.message || 'Error al eliminar dirección.';
			alert(errorMessage.value);
		}
	}

	async function handleWithdraw() {
		if(!withdrawalRequest.value.addressId || !withdrawalRequest.value.amount) {
			errorMessage.value = 'Por favor, selecciona una dirección y especifica un monto.';
			return;
		}
		isSubmittingWithdrawal.value = true;
		clearMessages();
		try {
			const { data } = await useApiFetch('/crypto/withdraw', {
				method: 'POST',
				body: { ...withdrawalRequest.value, blockchain: 'ARBITRUM' },
			});
			successMessage.value = data.value?.message || 'Retiro procesado exitosamente.';
			alert(successMessage.value);
			withdrawalRequest.value = { addressId: null, amount: '' };
			await authStore.fetchUser();
			await fetchWithdrawals();
		} catch(e) {
			errorMessage.value = e.data?.message || 'Ocurrió un error al procesar el retiro.';
			alert(errorMessage.value);
		} finally {
			isSubmittingWithdrawal.value = false;
		}
	}

	async function handleGenerateWallet() {
		isGeneratingWallet.value = true;
		try {
			await useApiFetch('/users/me/wallet', { method: 'POST' });
			await authStore.fetchUser();
			alert('¡Tu wallet ha sido generada con éxito!');
		} catch(e) {
			alert(e.data?.message || 'No se pudo generar la wallet.');
		} finally {
			isGeneratingWallet.value = false;
		}
	}

	async function handleRevealPrivateKey() {
		isFetchingPrivateKey.value = true;
		try {
			const { data } = await useApiFetch('/users/me/wallet/private-key');
			privateKey.value = data.value?.data?.privateKey;
			showPrivateKey.value = true;
		} catch(e) {
			alert(e.data?.message || 'No se pudo obtener la clave privada.');
		} finally {
			isFetchingPrivateKey.value = false;
		}
	}

	function copyToClipboard(text, message = 'Copiado al portapapeles') {
		navigator.clipboard.writeText(text).then(() => {
			alert(message);
		});
	}

	function clearMessages() {
		errorMessage.value = '';
		successMessage.value = '';
	}

	const formatMoney = (amount) => parseFloat(amount || 0)
		.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
	const formatDate = (dateString) => new Date(dateString).toLocaleString('es-MX', {
		dateStyle: 'medium',
		timeStyle: 'short',
	});

	const getStatusColor = (status) => {
		const map = {
			PENDING: { bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
			COMPLETED: { bg: 'bg-success/20', text: 'text-success' },
			FAILED: { bg: 'bg-error/20', text: 'text-error' },
		};
		return map[status] || { bg: 'bg-gray-500/20', text: 'text-gray-400' };
	};

	const getStatusIcon = (status) => {
		const map = {
			PENDING: 'heroicons:arrow-path-20-solid',
			COMPLETED: 'heroicons:check-circle-20-solid',
			FAILED: 'heroicons:x-circle-20-solid',
		};
		return map[status] || 'heroicons:question-mark-circle-20-solid';
	};

	onMounted(() => {
		fetchAddresses();
		fetchWithdrawals();
	});

	watch(activeTab, (newTab) => {
		clearMessages();
		if(newTab === 'addresses') fetchAddresses();
		if(newTab === 'history') fetchWithdrawals();
		if(newTab !== 'wallet') {
			showPrivateKey.value = false;
			privateKey.value = '';
		}
	});
</script>

<style scoped>
	select.input-glass option {
		color: black;
		background-color: white;
	}

	.list-enter-active,
	.list-leave-active {
		transition: all 0.5s ease;
	}

	.list-enter-from,
	.list-leave-to {
		opacity: 0;
		transform: translateX(30px);
	}
</style>
