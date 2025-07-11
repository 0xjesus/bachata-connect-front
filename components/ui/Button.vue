<!-- components/ui/Button.vue -->
<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="$emit('click', $event)"
  >
    <!-- Loading Spinner -->
    <svg v-if="loading" :class="spinnerClasses" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>

    <!-- Icon slot -->
    <slot name="icon" v-if="!loading && $slots.icon" />

    <!-- Default slot content -->
    <span v-if="!loading || showTextWhileLoading" :class="{ 'ml-2': loading && showTextWhileLoading }">
      <slot />
    </span>

    <!-- Suffix icon slot -->
    <slot name="suffix" v-if="!loading && $slots.suffix" />
  </button>
</template>

<script setup>
const props = defineProps({
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'md' },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  type: { type: String, default: 'button' },
  fullWidth: { type: Boolean, default: false },
  showTextWhileLoading: { type: Boolean, default: false },
  rounded: { type: String, default: 'md' }, // sm, md, lg, full
});

const emit = defineEmits(['click']);

const baseClasses = 'font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center transform hover:scale-105 disabled:transform-none disabled:opacity-50 disabled:cursor-not-allowed';

const variantClasses = {
  // Primary - Brand gradient
  primary: 'btn-primary text-white shadow-brand hover:shadow-brand-lg',

  // Secondary - Glass effect
  secondary: 'btn-secondary text-white',

  // Ghost - Transparent with hover
  ghost: 'bg-transparent text-white/80 hover:text-white hover:bg-white/10 focus:ring-primary/50',

  // Outline - Border style
  outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary/50',

  // Danger - Error style
  danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white shadow-lg hover:shadow-red-500/25 focus:ring-red-500/50',

  // Success - Success style
  success: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white shadow-lg hover:shadow-green-500/25 focus:ring-green-500/50',

  // Warning - Warning style
  warning: 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white shadow-lg hover:shadow-yellow-500/25 focus:ring-yellow-500/50',

  // Link - Text link style
  link: 'bg-transparent text-primary hover:text-secondary underline decoration-2 underline-offset-4 hover:no-underline focus:ring-primary/50 hover:scale-100',
};

const sizeClasses = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl',
};

const roundedClasses = {
  none: 'rounded-none',
  sm: 'rounded-md',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  full: 'rounded-full',
};

const spinnerClasses = computed(() => {
  const sizeMap = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-7 w-7',
  };

  return [
    'animate-spin',
    sizeMap[props.size],
    props.showTextWhileLoading ? 'mr-2' : ''
  ];
});

const buttonClasses = computed(() => [
  baseClasses,
  variantClasses[props.variant],
  sizeClasses[props.size],
  roundedClasses[props.rounded],
  props.fullWidth ? 'w-full' : '',
]);
</script>
