<!-- components/ui/Card.vue -->
<template>
  <div :class="cardClasses">
    <!-- Header slot -->
    <div v-if="$slots.header" class="border-b border-white/10 pb-4 mb-6">
      <slot name="header" />
    </div>

    <!-- Main content -->
    <div :class="contentClasses">
      <slot />
    </div>

    <!-- Footer slot -->
    <div v-if="$slots.footer" class="border-t border-white/10 pt-4 mt-6">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  variant: { type: String, default: 'default' },
  padding: { type: String, default: 'md' },
  hover: { type: Boolean, default: true },
  glow: { type: Boolean, default: false },
  rounded: { type: String, default: 'lg' },
});

const baseClasses = 'transition-all duration-300 overflow-hidden';

const variantClasses = {
  // Default glass card
  default: 'card-glass',

  // Intense glass effect
  intense: 'glass-intense rounded-2xl p-6',

  // Solid dark card
  solid: 'bg-slate-800 border border-slate-700 shadow-xl',

  // Gradient card
  gradient: 'bg-brand-gradient shadow-brand',

  // Minimal card
  minimal: 'bg-transparent border border-white/20',

  // Elevated card
  elevated: 'glass shadow-glass-lg hover:shadow-2xl',
};

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
};

const roundedClasses = {
  none: 'rounded-none',
  sm: 'rounded-md',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  xl: 'rounded-2xl',
  full: 'rounded-3xl',
};

const cardClasses = computed(() => [
  baseClasses,
  variantClasses[props.variant],
  // Override padding if variant doesn't include it
  !['default', 'intense'].includes(props.variant) ? paddingClasses[props.padding] : '',
  // Override rounded if variant doesn't include it
  !['default', 'intense'].includes(props.variant) ? roundedClasses[props.rounded] : '',
  {
    'hover:scale-105': props.hover && props.variant !== 'minimal',
    'animate-glow': props.glow,
  }
]);

const contentClasses = computed(() => ({
  // Add any content-specific classes here if needed
}));
</script>
