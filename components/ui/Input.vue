<!-- components/ui/Input.vue -->
<template>
  <div class="group">
    <label v-if="label" :for="id" class="block text-sm font-semibold text-white/90 mb-2 group-focus-within:text-primary transition-colors duration-300">
      {{ label }}
      <span v-if="required" class="text-error ml-1">*</span>
    </label>

    <div class="relative">
      <!-- Icon slot -->
      <div v-if="$slots.icon || icon" class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <slot name="icon">
          <component v-if="icon" :is="icon" class="h-5 w-5 text-white/50 group-focus-within:text-primary transition-colors duration-300" />
        </slot>
      </div>

      <!-- Input field -->
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :autocomplete="autocomplete"
        :min="min"
        :max="max"
        :step="step"
        class="input-glass transition-all duration-300"
        :class="[
          inputClasses,
          {
            'pl-12': $slots.icon || icon,
            'pr-12': $slots.suffix || suffix,
            'border-error/50 focus:ring-error/50': error,
            'border-success/50 focus:ring-success/50': success,
          }
        ]"
      />

      <!-- Suffix slot -->
      <div v-if="$slots.suffix || suffix" class="absolute inset-y-0 right-0 pr-4 flex items-center">
        <slot name="suffix">
          <component v-if="suffix" :is="suffix" class="h-5 w-5 text-white/50" />
        </slot>
      </div>
    </div>

    <!-- Help text -->
    <p v-if="help && !error" class="mt-2 text-xs text-white/60">{{ help }}</p>

    <!-- Error message -->
    <div v-if="error" class="mt-2 flex items-center space-x-2">
      <svg class="h-4 w-4 text-error flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <p class="text-sm text-error">{{ error }}</p>
    </div>

    <!-- Success message -->
    <div v-if="success" class="mt-2 flex items-center space-x-2">
      <svg class="h-4 w-4 text-success flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
      </svg>
      <p class="text-sm text-success">{{ success }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: [String, Number],
  label: String,
  id: String,
  type: { type: String, default: 'text' },
  placeholder: String,
  error: String,
  success: String,
  help: String,
  disabled: Boolean,
  required: Boolean,
  autocomplete: String,
  icon: [String, Object],
  suffix: [String, Object],
  size: { type: String, default: 'md' },
  variant: { type: String, default: 'default' },
  min: [String, Number],
  max: [String, Number],
  step: [String, Number],
});

const emit = defineEmits(['update:modelValue', 'focus', 'blur']);

const inputClasses = computed(() => {
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  };

  const variantClasses = {
    default: 'hover:bg-white/15',
    search: 'rounded-full',
    minimal: 'bg-transparent border-0 border-b-2 border-white/20 rounded-none focus:border-primary',
  };

  return [
    sizeClasses[props.size],
    variantClasses[props.variant],
  ];
});
</script>
