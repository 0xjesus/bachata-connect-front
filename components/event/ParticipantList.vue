<!-- components/event/ParticipantList.vue -->
<template>
	<div class="space-y-6">

		<!-- Header with stats -->
		<div class="flex items-center justify-between">
			<div>
				<h3 class="text-xl font-bold text-white flex items-center space-x-2">
					<svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
						/>
					</svg>
					<span>Participantes</span>
				</h3>
				<p class="text-white/60 text-sm">{{ participants.length }} bailarines apoyando</p>
			</div>

			<!-- Total raised amount -->
			<div class="text-right">
				<div class="text-2xl font-bold text-primary">
					${{ totalAmount.toLocaleString() }}
				</div>
				<div class="text-white/60 text-xs">Total recaudado</div>
			</div>
		</div>

		<!-- Participants list -->
		<div v-if="participants.length > 0" class="space-y-3">

			<!-- Top contributors highlight -->
			<div v-if="topContributors.length" class="space-y-3">
				<h4 class="text-sm font-bold text-primary flex items-center space-x-2">
					<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
						<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
					</svg>
					<span>Top Contribuidores</span>
				</h4>

				<div class="space-y-2">
					<div
						v-for="(participant, index) in topContributors"
						:key="participant.user.id"
						class="glass rounded-xl p-4 relative overflow-hidden group hover:bg-white/15 transition-all duration-300"
					>
						<!-- Rank decoration -->
						<div class="absolute top-0 right-0 w-16 h-16 opacity-20">
							<div
								class="w-full h-full rounded-full blur-xl"
								:class="{
                  'bg-yellow-400': index === 0,
                  'bg-gray-400': index === 1,
                  'bg-orange-600': index === 2
                }"
							/>
						</div>

						<div class="flex items-center justify-between relative z-10">
							<div class="flex items-center space-x-3">

								<!-- Rank badge -->
								<div
									class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2"
									:class="{
                    'bg-yellow-400/20 border-yellow-400/50 text-yellow-300': index === 0,
                    'bg-gray-400/20 border-gray-400/50 text-gray-300': index === 1,
                    'bg-orange-600/20 border-orange-600/50 text-orange-300': index === 2
                  }"
								>
									{{ index + 1 }}
								</div>

								<!-- User info -->
								<div class="flex items-center space-x-3">
									<img
										:src="participant.user.metas?.profile_picture_url || `https://picsum.photos/40/40?random=${participant.user.id}`"
										:alt="participant.user.nicename"
										class="w-10 h-10 rounded-full object-cover border-2 border-white/20 group-hover:border-primary/50 transition-all duration-300"
									/>
									<div>
										<span class="font-bold text-white group-hover:text-primary transition-colors duration-300">
											{{ participant.user.nicename }}
										</span>
										<div class="flex items-center space-x-1">
											<span class="text-xs text-primary bg-primary/20 px-2 py-0.5 rounded-full border border-primary/30">
												⭐ VIP
											</span>
										</div>
									</div>
								</div>
							</div>

							<!-- Amount with animation -->
							<div class="text-right">
								<span class="font-bold text-lg text-success">
									${{ Number(participant.amount).toLocaleString() }}
								</span>
								<div class="text-xs text-white/60">
									{{ getContributionPercentage(participant.amount) }}% del total
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Regular participants -->
			<div v-if="regularParticipants.length" class="space-y-3">
				<h4 class="text-sm font-bold text-white/80 flex items-center space-x-2">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
						/>
					</svg>
					<span>Otros Participantes</span>
				</h4>

				<div class="max-h-80 overflow-y-auto pr-2 space-y-2 scrollbar-thin">
					<div
						v-for="participant in regularParticipants"
						:key="participant.user.id"
						class="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
					>
						<div class="flex items-center space-x-3">
							<img
								:src="participant.user.metas?.profile_picture_url || `https://picsum.photos/40/40?random=${participant.user.id}`"
								:alt="participant.user.nicename"
								class="w-8 h-8 rounded-full object-cover border border-white/20 group-hover:border-primary/50 transition-all duration-300"
							/>
							<span class="font-medium text-white/90 group-hover:text-white transition-colors duration-300">
								{{ participant.user.nicename }}
							</span>
						</div>

						<span class="font-semibold text-success text-sm">
							${{ Number(participant.amount).toLocaleString() }}
						</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Empty state -->
		<div v-else class="text-center py-12">
			<div class="glass rounded-2xl p-8 max-w-sm mx-auto">
				<img
					src="/images/events/be-first-supporter.png"
					alt="Be the first supporter"
					class="w-20 h-20 mx-auto mb-4 opacity-80"
				/>
				<h4 class="text-lg font-bold text-white mb-2">¡Sé el Primero!</h4>
				<p class="text-white/70 text-sm">
					Este evento aún no tiene participantes. ¡Apóyalo y sé parte de algo increíble!
				</p>
			</div>
		</div>

		<!-- Summary stats -->
		<div v-if="participants.length > 0" class="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
			<div class="text-center">
				<div class="text-lg font-bold text-primary">{{ avgContribution }}</div>
				<div class="text-xs text-white/60">Aporte promedio</div>
			</div>
			<div class="text-center">
				<div class="text-lg font-bold text-secondary">{{ participants.length }}</div>
				<div class="text-xs text-white/60">Participantes</div>
			</div>
			<div class="text-center">
				<div class="text-lg font-bold text-accent">{{ Math.ceil(totalAmount / 100) }}</div>
				<div class="text-xs text-white/60">Nivel de apoyo</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		participants: { type: Array, required: true },
	});

	// Computed properties
	const totalAmount = computed(() => {
		return props.participants.reduce((sum, p) => sum + Number(p.amount), 0);
	});

	const sortedParticipants = computed(() => {
		return [ ...props.participants ].sort((a, b) => Number(b.amount) - Number(a.amount));
	});

	const topContributors = computed(() => {
		return sortedParticipants.value.slice(0, 3).filter(p => Number(p.amount) >= 500);
	});

	const regularParticipants = computed(() => {
		const topIds = topContributors.value.map(p => p.user.id);
		return sortedParticipants.value.filter(p => !topIds.includes(p.user.id));
	});

	const avgContribution = computed(() => {
		if(props.participants.length === 0) return '$0';
		const avg = totalAmount.value / props.participants.length;
		return '$' + Math.round(avg).toLocaleString();
	});

	// Helper functions
	function getContributionPercentage(amount) {
		if(totalAmount.value === 0) return 0;
		return Math.round((Number(amount) / totalAmount.value) * 100);
	}
</script>

<style scoped>
	/* Custom scrollbar */
	.scrollbar-thin::-webkit-scrollbar {
		width: 4px;
	}

	.scrollbar-thin::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 2px;
	}

	.scrollbar-thin::-webkit-scrollbar-thumb {
		background: rgb(var(--color-primary) / 0.5);
		border-radius: 2px;
	}

	.scrollbar-thin::-webkit-scrollbar-thumb:hover {
		background: rgb(var(--color-primary) / 0.7);
	}
</style>
