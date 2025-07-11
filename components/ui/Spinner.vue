<!-- components/ui/Spinner.vue -->
<template>
  <div :class="containerClasses">
    <!-- Default spinner -->
    <svg
      v-if="variant === 'default'"
      class="animate-spin text-current"
      :class="sizeClasses"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>

    <!-- Dots spinner -->
    <div v-else-if="variant === 'dots'" class="flex space-x-1">
      <div
        v-for="i in 3"
        :key="i"
        class="rounded-full bg-current animate-pulse"
        :class="dotSizeClasses"
        :style="{ animationDelay: `${(i - 1) * 0.2}s` }"
      />
    </div>

    <!-- Pulse spinner -->
    <div
      v-else-if="variant === 'pulse'"
      class="rounded-full bg-current animate-ping"
      :class="pulseSizeClasses"
    />

    <!-- Ring spinner -->
    <div
      v-else-if="variant === 'ring'"
      class="border-4 border-current border-t-transparent rounded-full animate-spin"
      :class="ringSizeClasses"
    />

    <!-- Gradient ring spinner -->
    <div
      v-else-if="variant === 'gradient'"
      class="relative"
      :class="gradientContainerClasses"
    >
      <div class="absolute inset-0 bg-brand-gradient rounded-full opacity-20" />
      <div class="relative border-4 border-transparent rounded-full animate-spin" :class="gradientSizeClasses">
        <div class="absolute inset-0 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    </div>

    <!-- Dancing dots (BachataConnect special) -->
    <div v-else-if="variant === 'dance'" class="flex space-x-1">
      <div
        v-for="i in 4"
        :key="i"
        class="rounded-full bg-current animate-dance"
        :class="dotSizeClasses"
        :style="{
          animationDelay: `${(i - 1) * 0.1}s`,
          background: i === 1 ? 'rgb(var(--color-primary))' :
                     i === 2 ? 'rgb(var(--color-secondary))' :
                     i === 3 ? 'rgb(var(--color-accent))' :
                     'rgb(var(--color-pink))'
        }"
      />
    </div>

    <!-- Text label -->
    <span v-if="label" class="ml-2 text-sm font-medium text-current">
      {{ label }}
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'dots', 'pulse', 'ring', 'gradient', 'dance'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  label: String,
  center: { type: Boolean, default: false },
});

const sizeMap = {
  xs: { spinner: 'h-3 w-3', dot: 'h-1 w-1', ring: 'h-4 w-4', pulse: 'h-2 w-2' },
  sm: { spinner: 'h-4 w-4', dot: 'h-1.5 w-1.5', ring: 'h-5 w-5', pulse: 'h-3 w-3' },
  md: { spinner: 'h-5 w-5', dot: 'h-2 w-2', ring: 'h-6 w-6', pulse: 'h-4 w-4' },
  lg: { spinner: 'h-6 w-6', dot: 'h-2.5 w-2.5', ring: 'h-8 w-8', pulse: 'h-5 w-5' },
  xl: { spinner: 'h-8 w-8', dot: 'h-3 w-3', ring: 'h-10 w-10', pulse: 'h-6 w-6' },
};

const sizeClasses = computed(() => sizeMap[props.size].spinner);
const dotSizeClasses = computed(() => sizeMap[props.size].dot);
const ringSizeClasses = computed(() => sizeMap[props.size].ring);
const pulseSizeClasses = computed(() => sizeMap[props.size].pulse);
const gradientSizeClasses = computed(() => sizeMap[props.size].ring);
const gradientContainerClasses = computed(() => sizeMap[props.size].ring);

const containerClasses = computed(() => [
  'inline-flex items-center',
  { 'justify-center w-full': props.center }
]);
</script>

<style scoped>
@keyframes dance {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-4px) rotate(2deg);
  }
  50% {
    transform: translateY(0) rotate(0deg);
  }
  75% {
    transform: translateY(-2px) rotate(-1deg);
  }
}

.animate-dance {
  animation: dance 1s ease-in-out infinite;
}
</style>
