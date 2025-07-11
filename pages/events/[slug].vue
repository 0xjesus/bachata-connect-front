<!-- pages/events/[slug].vue - REFACTORIZADO -->
<template>
	<div class="min-h-screen">
		<div v-if="pending" class="flex items-center justify-center min-h-screen">
			<div class="text-center space-y-4">
				<div class="w-20 h-20 border-4 border-white/20 border-t-primary rounded-full animate-spin mx-auto"></div>
				<div class="space-y-2">
					<h3 class="text-xl font-bold text-white">Cargando evento...</h3>
					<p class="text-white/60">Preparando toda la información</p>
				</div>
			</div>
		</div>

		<div v-else-if="error || !event" class="flex items-center justify-center min-h-screen">
			<div class="text-center space-y-6 max-w-md">
				<div class="w-24 h-24 bg-error/20 rounded-full flex items-center justify-center mx-auto">
					<svg class="w-12 h-12 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<div class="space-y-2">
					<h3 class="text-2xl font-bold text-white">¡Oops! Algo salió mal</h3>
					<p class="text-white/70">No pudimos cargar este evento. Puede que no exista o haya un problema temporal.</p>
				</div>
				<NuxtLink to="/" class="btn-primary px-6 py-3 inline-flex items-center space-x-2">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 19l-7-7m0 0l7-7m-7 7h18"
						/>
					</svg>
					<span>Volver al inicio</span>
				</NuxtLink>
			</div>
		</div>

		<div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<section class="mb-12">
				<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div class="lg:col-span-2 space-y-8">
						<div class="relative">
							<div class="relative h-80 lg:h-96 rounded-3xl overflow-hidden group">
								<img
									:src="coverImageUrl"
									:alt="event.title"
									class="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
								/>
								<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
								<div
									v-if="isHost"
									class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
								>
									<button
										@click="triggerFileInput"
										:disabled="uploadingCover"
										class="btn-secondary px-6 py-3 rounded-full flex items-center space-x-2 text-lg"
									>
										<UiSpinner v-if="uploadingCover" size="sm" class="mr-2" />
										<Icon v-else name="heroicons:photo-20-solid" class="w-5 h-5" />
										<span>{{ uploadingCover ? 'Subiendo...' : 'Cambiar Portada' }}</span>
									</button>
									<input
										type="file"
										ref="fileInput"
										@change="handleFileChange"
										accept="image/jpeg, image/png, image/gif"
										class="hidden"
									/>
								</div>
								<div
									v-if="uploadError"
									class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-error/80 text-white px-4 py-2 rounded-lg text-sm animate-shake"
								>{{ uploadError }}
								</div>
								<div class="absolute top-6 left-6"><span
									class="glass-intense px-4 py-2 rounded-full text-sm font-bold"
									:class="statusBadgeClass"
								>{{ statusText }}</span></div>
								<div class="absolute top-6 right-6">
									<button class="btn-secondary p-3 rounded-full">
										<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
											/>
										</svg>
									</button>
								</div>
								<div class="absolute bottom-6 left-6 right-6">
									<h1 class="text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">{{ event.title }}</h1>
									<div class="flex items-center space-x-4 text-white/90">
										<div class="flex items-center space-x-2">
											<div class="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center">
												<svg
													class="w-5 h-5 text-primary"
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
											<div>
												<p class="text-sm opacity-80">Organizado por</p>
												<p class="font-bold text-primary">{{ event.host?.nicename || 'Anónimo' }}</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="card-glass p-6 space-y-6">
							<!-- Panel de Organizador - SOLO PARA EL HOST -->
							<div v-if="isHost">
								<h3 class="text-lg font-bold text-white flex items-center space-x-2 mb-4">
									<Icon name="heroicons:wrench-screwdriver-20-solid" class="text-accent" />
									<span>Panel de Organizador</span>
								</h3>
								<div class="space-y-3">
									<label
										for="status-select"
										class="font-semibold text-white"
									>Gestionar Estado del Evento</label>
									<div class="flex items-center space-x-4 text-black">
										<select
											id="status-select"
											v-model="selectedStatus"
											class="input-glass flex-1 text-white/90"
										>
											<option value="FUNDING">Financiamiento Activo</option>
											<option value="CONFIRMED">Confirmado (Meta alcanzada)</option>
											<option value="CANCELLED">Cancelar Evento</option>
										</select>
										<button
											@click="handleStatusChange"
											:disabled="statusChangeLoading"
											class="btn-primary"
										>
											<UiSpinner v-if="statusChangeLoading" size="sm" />
											<span v-else>Guardar</span>
										</button>
									</div>
								</div>
							</div>

							<!-- Simulación (Hackathon) - SOLO PARA EL HOST -->
							<div v-if="isHost" class="border-t border-white/10 pt-4">
								<h4 class="font-semibold text-white mb-3 flex items-center space-x-2">
									<Icon name="heroicons:beaker-20-solid" class="text-secondary" />
									<span>Simulación (Hackathon)</span>
								</h4>
								<p class="text-xs text-white/70 mb-3">Estos botones están habilitados únicamente para el organizador del evento.</p>
								<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
									<button
										@click="simulateDeadlineReached"
										:disabled="simulatingDeadline || event.status !== 'FUNDING'"
										class="btn-secondary py-3 bg-orange-600/50 hover:bg-orange-500/50"
									>
										<UiSpinner v-if="simulatingDeadline" size="sm" class="mr-2" />
										<span>{{ simulatingDeadline ? 'Simulando...' : 'Simular Deadline Sin Meta' }}</span>
									</button>
									<button
										@click="handleCancelEvent"
										:disabled="cancelingEvent || ['CANCELLED', 'COMPLETED'].includes(event.status)"
										class="btn-secondary py-3 bg-red-600/50 hover:bg-red-500/50"
									>
										<UiSpinner v-if="cancelingEvent" size="sm" class="mr-2" />
										<span>{{ cancelingEvent ? 'Cancelando...' : 'Cancelar Evento' }}</span>
									</button>
								</div>
							</div>
						</div>

						<div class="card-glass p-8">
							<h2 class="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
								<svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<span>Sobre este evento</span>
							</h2>
							<div class="prose prose-lg prose-invert max-w-none">
								<p class="text-white/90 leading-relaxed text-lg">{{ event.description }}</p>
							</div>
							<div class="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/10">
								<div class="text-center">
									<div class="text-2xl font-bold text-primary mb-1">{{ participantCount }}</div>
									<div class="text-white/60 text-sm">Participantes</div>
								</div>
								<div class="text-center">
									<div class="text-2xl font-bold text-secondary mb-1">{{ daysLeft }}</div>
									<div class="text-white/60 text-sm">Días restantes</div>
								</div>
								<div class="text-center">
									<div class="text-2xl font-bold text-accent mb-1">{{ progressPercentage.toFixed(0) }}%</div>
									<div class="text-white/60 text-sm">Completado</div>
								</div>
							</div>
						</div>

						<div class="card-glass p-8 space-y-8">
							<h2 class="text-2xl font-bold text-white flex items-center justify-between">
								<span class="flex items-center space-x-3">
									<Icon name="heroicons:megaphone-20-solid" class="text-primary" />
									<span>Actualizaciones del Evento</span>
								</span>
								<span
									v-if="event.updates?.length"
									class="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm border border-primary/30"
								>{{ event.updates.length }}</span>
							</h2>
							<EventUpdateForm v-if="isHost" :event-id="event.id" @update-posted="refresh" />
							<div v-if="event.updates && event.updates.length > 0" class="space-y-6">
								<EventUpdate
									v-for="update in event.updates"
									:key="update.id"
									:update="update"
									:event="event"
									class="animate-fade-in-up"
								/>
							</div>
							<div v-else class="text-center py-12">
								<div class="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
									<Icon
										name="heroicons:chat-bubble-left-ellipsis-20-solid"
										class="w-8 h-8 text-primary"
									/>
								</div>
								<h4 class="text-lg font-bold text-white mb-2">Aún no hay actualizaciones</h4>
								<p
									class="text-white/60"
									v-if="!isHost"
								>El organizador compartirá novedades próximamente.</p>
								<p
									class="text-white/60"
									v-else
								>¡Comparte el primer update para mantener informada a tu comunidad!</p>
							</div>
						</div>
					</div>

					<div class="lg:col-span-1 space-y-6">
						<div class="card-glass p-6 sticky top-8">
							<div class="mb-8">
								<div class="flex justify-between items-baseline mb-2">
									<span class="text-3xl font-bold text-success">${{
											Number(event.currentAmount || 0).toLocaleString()
										}}</span>
									<span class="text-white/60">de ${{
											Number(event.targetAmount || 0).toLocaleString()
										}}</span>
								</div>
								<div class="w-full bg-white/20 rounded-full h-4 mb-3 overflow-hidden">
									<div
										class="bg-brand-gradient h-4 rounded-full transition-all duration-1000 animate-glow"
										:style="{ width: progressPercentage + '%' }"
									></div>
								</div>
								<p class="text-center text-sm text-white/80 font-medium">{{ progressPercentage.toFixed(1) }}% financiado</p>
							</div>
							<form @submit.prevent="joinEvent" class="space-y-6">
								<div class="group">
									<label
										for="amount"
										class="block text-sm font-semibold text-white/90 mb-2 group-focus-within:text-primary transition-colors duration-300"
									>Monto a aportar</label>
									<div class="relative">
										<div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
											<span class="text-white/50 group-focus-within:text-primary transition-colors duration-300 font-bold text-lg">$</span>
										</div>
										<input
											id="amount"
											v-model.number="joinAmount"
											type="number"
											min="10"
											step="10"
											placeholder="100"
											:disabled="!canJoin"
											class="input-glass pl-8 pr-4 py-4 text-lg hover:bg-white/15"
											:class="{ 'opacity-50 cursor-not-allowed': !canJoin }"
										/>
									</div>
									<p class="mt-2 text-xs text-white/60">Monto mínimo: $10 MXN</p>
								</div>
								<div class="grid grid-cols-3 gap-2">
									<button
										v-for="amount in quickAmounts"
										:key="amount"
										type="button"
										@click="joinAmount = amount"
										:disabled="!canJoin"
										class="btn-secondary py-2 text-sm"
									>${{ amount }}
									</button>
								</div>
								<button
									type="submit"
									:disabled="!canJoin || joinLoading || !joinAmount || joinAmount < 10"
									class="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
								>
									<UiSpinner v-if="joinLoading" class="animate-spin h-6 w-6 mr-3 text-white" />
									<span
										v-if="!joinLoading"
										class="flex items-center justify-center space-x-2"
									><span>{{ joinButtonText }}</span>
										<svg
											v-if="canJoin"
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
									<span v-else>Procesando...</span>
								</button>
								<div
									v-if="joinError"
									class="glass bg-error/20 border border-error/30 rounded-xl p-4 animate-shake"
								>
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
										<p class="text-red-200 font-medium text-sm">{{ joinError }}</p>
									</div>
								</div>
								<p class="text-center text-xs text-white/60 leading-relaxed">Al aportar, aceptas nuestros términos de servicio y política de reembolsos.</p>
							</form>
						</div>
						<div class="card-glass p-6">
							<ParticipantList :participants="event.participants || []" />
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script setup>
	import { ref, computed, watch } from 'vue';
	import { useRoute } from 'vue-router';
	import { useAuthStore } from '#imports';
	import { useNuxtApp } from '#app';

	const route = useRoute();
	const slug = route.params.slug;
	const authStore = useAuthStore();
	const { $toast } = useNuxtApp();

	const fileInput = ref(null);
	const uploadingCover = ref(false);
	const uploadError = ref('');
	const joinAmount = ref('');
	const joinLoading = ref(false);
	const joinError = ref('');

	const simulatingDeadline = ref(false);
	const cancelingEvent = ref(false);
	const statusChangeLoading = ref(false);
	const selectedStatus = ref('');

	const quickAmounts = [ 50, 100, 250 ];

	const { data: response, pending, error, refresh } = await useApiFetch(`/events/${ slug }/public`);

	const event = computed(() => response.value?.data || null);

	watch(event, (newEvent) => {
		if(newEvent) {
			selectedStatus.value = newEvent.status;
		}
	}, { immediate: true });

	const coverImageUrl = computed(() => event.value?.idCoverImage ? `/api/users/${ event.value.idCoverImage }/avatar` : `https://ui-avatars.com/api/?name=${ encodeURIComponent(event.value?.title || 'E') }&size=1200&background=1a202c&color=fff&bold=true`);
	const isHost = computed(() => authStore.isAuthenticated && event.value?.host?.id === authStore.user?.id);
	const progressPercentage = computed(() => (!event.value || !event.value.targetAmount || +event.value.targetAmount === 0) ? 0 : Math.min((+event.value.currentAmount / +event.value.targetAmount) * 100, 100));
	const canJoin = computed(() => event.value?.status === 'FUNDING' && authStore.isAuthenticated && !isHost.value);
	const joinButtonText = computed(() => {
		if(isHost.value) return 'Eres el organizador';
		if(!authStore.isAuthenticated) return 'Inicia sesión para aportar';
		if(event.value?.status !== 'FUNDING') return `Evento ${ statusText.value }`;
		return '¡Apoyar este evento!';
	});
	const statusText = computed(() => {
		const map = {
			'FUNDING': 'Financiamiento Activo',
			'CONFIRMED': 'Meta Alcanzada',
			'COMPLETED': 'Evento Realizado',
			'CANCELLED': 'Cancelado',
		};
		return map[event.value?.status] || 'Activo';
	});
	const statusBadgeClass = computed(() => {
		const map = {
			'FUNDING': 'text-primary bg-primary/20',
			'CONFIRMED': 'text-success bg-success/20',
			'COMPLETED': 'text-gray-400 bg-gray-600/20',
			'CANCELLED': 'text-error bg-error/20',
		};
		return map[event.value?.status] || 'text-primary bg-primary/20';
	});
	const participantCount = computed(() => event.value?.participants?.length || 0);
	const daysLeft = computed(() => {
		if(!event.value?.fundingDeadline) return '--';
		const deadline = new Date(event.value.fundingDeadline);
		if(isNaN(deadline.getTime())) return '--';
		const diffDays = Math.ceil((deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
		return diffDays > 0 ? diffDays : 0;
	});

	function triggerFileInput() { fileInput.value?.click(); }

	async function handleFileChange(e) {
		const file = e.target.files[0];
		if(!file) return;
		uploadingCover.value = true;
		const formData = new FormData();
		formData.append('file', file);
		try {
			await useApiFetch(`/events/${ event.value.id }/cover`, { method: 'PUT', body: formData });
			$toast.success('¡Portada actualizada!');
			await refresh();
		} catch(err) {
			$toast.error(err.data?.message || 'Error al subir imagen.');
		} finally {
			uploadingCover.value = false;
		}
	}

	async function joinEvent() {
		if(!joinAmount.value || joinAmount.value < 10) {
			joinError.value = 'Monto mínimo: $10 MXN.';
			return;
		}
		joinLoading.value = true;
		joinError.value = '';
		try {
			await useApiFetch(`/events/${ event.value.id }/join`, {
				method: 'POST',
				body: { amount: joinAmount.value },
			});
			$toast.success('¡Gracias por tu apoyo!');
			joinAmount.value = '';
			await Promise.all([ refresh(), authStore.fetchUser() ]);
		} catch(err) {
			joinError.value = err.data?.message || 'Error al procesar el aporte.';
		} finally {
			joinLoading.value = false;
		}
	}

	async function simulateDeadlineReached() {
		if(!confirm('¿Simular que llegó el deadline sin cumplir la meta? Esto disparará reembolsos automáticamente.')) {
			return;
		}

		simulatingDeadline.value = true;
		try {
			const { data } = await useApiFetch(`/events/${ event.value.id }/simulate-deadline`, { method: 'POST' });
			$toast.success(data.value?.message || 'Deadline simulado. Evento cancelado y reembolsos procesados.');
			await refresh();
		} catch(e) {
			$toast.error(e.data?.message || 'Error simulando deadline.');
		} finally {
			simulatingDeadline.value = false;
		}
	}

	async function handleCancelEvent() {
		if(!confirm('¿Estás seguro de que quieres CANCELAR este evento? Se reembolsará a todos los participantes. Esta acción es irreversible.')) {
			return;
		}

		cancelingEvent.value = true;
		try {
			await useApiFetch(`/events/${ event.value.id }`, { method: 'DELETE' });
			$toast.success('Evento cancelado. Reembolsos procesados.');
			await refresh();
		} catch(e) {
			$toast.error(e.data?.message || 'Error al cancelar evento.');
		} finally {
			cancelingEvent.value = false;
		}
	}

	async function handleStatusChange() {
		if(selectedStatus.value === event.value.status) {
			$toast.info('El evento ya está en este estado.');
			return;
		}
		const confirmMessage = selectedStatus.value === 'CANCELLED' ? '¿Seguro que quieres CANCELAR? Los fondos se reembolsarán. Esta acción es irreversible.' : `¿Cambiar estado a ${ selectedStatus.value }?`;
		if(!confirm(confirmMessage)) {
			selectedStatus.value = event.value.status;
			return;
		}
		statusChangeLoading.value = true;
		try {
			await useApiFetch(`/events/${ event.value.id }/status`, {
				method: 'PUT',
				body: { status: selectedStatus.value },
			});
			$toast.success('¡Estado del evento actualizado!');
			await refresh();
		} catch(e) {
			$toast.error(e.data?.message || 'No se pudo cambiar el estado.');
			selectedStatus.value = event.value.status;
		} finally {
			statusChangeLoading.value = false;
		}
	}

	useHead(() => ({
		title: pending.value ? 'Cargando...' : `${ event.value?.title || 'Evento no encontrado' } - BachataConnect`,
	}));
</script>

<style scoped>
	/* Aquí puedes agregar estilos específicos para este componente */
	.input-glass option {
		color: #111827;
		background-color: #FFFFFF;
	}
</style>
