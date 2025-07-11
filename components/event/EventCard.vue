<template>
	<NuxtLink
		:to="`/events/${event.publicSlug}`"
		class="group block relative overflow-hidden rounded-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
	>
		<div class="card-glass h-full relative overflow-hidden">

			<div class="relative h-48 overflow-hidden rounded-t-2xl">
				<img
					v-if="event.coverImage"
					:src="event.coverImage.metas.location"
					:alt="event.title"
					class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
				/>

				<div
					v-else
					class="relative w-full h-full overflow-hidden"
				>
					<img
						:src="getEventTypeImage(event.title)"
						:alt="event.title"
						class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
					/>
					<div class="absolute inset-0 bg-dance-gradient opacity-60"></div>
				</div>

				<div class="absolute top-3 left-3">
					<span
						class="px-3 py-1 rounded-full text-xs font-bold glass-intense"
						:class="statusBadgeClass"
					>
						{{ statusText }}
					</span>
				</div>

				<div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
					<div class="w-full bg-white/20 rounded-full h-2 mb-2">
						<div
							class="bg-brand-gradient h-2 rounded-full transition-all duration-1000 group-hover:animate-glow"
							:style="{ width: progressPercentage + '%' }"
						/>
					</div>
					<div class="flex justify-between items-center">
						<span class="text-white font-bold text-sm">{{ progressPercentage.toFixed(0) }}%</span>
						<span class="text-white/80 text-xs">financiado</span>
					</div>
				</div>
			</div>

			<div class="p-6 space-y-4">
				<div>
					<h3 class="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
						{{ event.title }}
					</h3>
					<div class="flex items-center space-x-2 text-white/70">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
							/>
						</svg>
						<span class="text-sm font-medium">{{ event.host.nicename }}</span>
					</div>
				</div>

				<div class="grid grid-cols-3 gap-4 text-center">
					<div class="space-y-1">
						<div class="text-primary font-bold text-lg">
							${{ formatAmount(event.currentAmount) }}
						</div>
						<div class="text-white/60 text-xs">Recaudado</div>
					</div>

					<div class="space-y-1">
						<div class="text-white font-bold text-lg">
							${{ formatAmount(event.targetAmount) }}
						</div>
						<div class="text-white/60 text-xs">Meta</div>
					</div>

					<div class="space-y-1">
						<div class="text-secondary font-bold text-lg">
							{{ participantCount }}
						</div>
						<div class="text-white/60 text-xs">Apoyos</div>
					</div>
				</div>

				<div v-if="eventTags.length" class="flex flex-wrap gap-2">
					<span
						v-for="tag in eventTags.slice(0, 3)"
						:key="tag"
						class="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80"
					>
						{{ tag }}
					</span>
				</div>

				<div class="pt-2">
					<div class="flex items-center justify-between">
						<div class="flex items-center space-x-1 text-white/60">
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<span class="text-xs">{{ timeLeft }}</span>
						</div>

						<div class="btn-primary px-4 py-2 text-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
							Ver Evento
						</div>
					</div>
				</div>
			</div>

			<div class="absolute inset-0 rounded-2xl bg-brand-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
		</div>
	</NuxtLink>
</template>

<script setup>
	const props = defineProps({
		event: {
			type: Object,
			required: true,
		},
	});

	const progressPercentage = computed(() => {
		if(!props.event || !props.event.targetAmount || +props.event.targetAmount === 0) {
			return 0;
		}
		const percentage = (+props.event.currentAmount / +props.event.targetAmount) * 100;
		return Math.min(percentage, 100);
	});

	const statusText = computed(() => {
		const status = props.event.status || 'FUNDING';
		const statusMap = {
			'FUNDING': 'Activo',
			'CONFIRMED': 'Meta Alcanzada',
			'COMPLETED': 'Realizado',
			'CANCELLED': 'Cancelado',
		};
		return statusMap[status] || 'Activo';
	});

	const statusBadgeClass = computed(() => {
		const status = props.event.status || 'FUNDING';
		const classMap = {
			'FUNDING': 'text-primary bg-primary/20 border border-primary/30',
			'CONFIRMED': 'text-success bg-success/20 border border-success/30',
			'COMPLETED': 'text-blue-400 bg-blue-400/20 border border-blue-400/30',
			'CANCELLED': 'text-error bg-error/20 border border-error/30',
		};
		return classMap[status] || 'text-primary bg-primary/20 border border-primary/30';
	});

	const participantCount = computed(() => {
		return props.event._count?.participants || 0;
	});

	const eventTags = computed(() => {
		return props.event.tags || props.event.metas?.tags || [];
	});

	const timeLeft = computed(() => {
		if(!props.event.fundingDeadline) return 'No definido';
		const now = new Date();
		const deadline = new Date(props.event.fundingDeadline);
		const diffTime = deadline - now;

		if(diffTime <= 0) {
			return props.event.status === 'FUNDING' ? 'Finalizando...' : 'Finalizado';
		}

		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		if(diffDays > 1) return `${ diffDays } días restantes`;
		if(diffDays === 1) return 'Termina mañana';

		const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
		if(diffHours > 1) return `Termina en ${ diffHours } horas`;

		const diffMinutes = Math.ceil(diffTime / (1000 * 60));
		if(diffMinutes > 1) return `Termina en ${ diffMinutes } minutos`;

		return 'Termina pronto';
	});

	function formatAmount(amount) {
		const num = Number(amount) || 0;
		if(num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
		if(num >= 1000) return (num / 1000).toFixed(1) + 'K';
		return num.toLocaleString();
	}

	function getEventTypeImage(title) {
		const titleLower = title.toLowerCase();
		if(titleLower.includes('festival')) {
			return '/images/events/festival-default.png';
		} else if(titleLower.includes('workshop') || titleLower.includes('clase')) {
			return '/images/events/workshop-default.png';
		} else if(titleLower.includes('social')) {
			return '/images/events/social-default.png';
		} else if(titleLower.includes('competencia')) {
			return '/images/events/competition-default.png';
		} else {
			return '/images/events/general-default.png';
		}
	}
</script>

<style scoped>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
