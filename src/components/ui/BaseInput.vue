<template>
  <div class="input-wrapper">
    <input
        class="base-input"
        type="text"
        :value="modelValue"
        @input="onInput"
        @blur="onBlur"
        :aria-invalid="error ? 'true' : 'false'"
        :aria-label="ariaLabel"
    />
    <div v-if="error" class="error-text" role="alert">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  modelValue: string | number;
  error?: string | null;
  ariaLabel?: string; // Для доступности
}>();

const emits = defineEmits(['update:modelValue', 'blur']);

function onInput(event: Event) {
  emits('update:modelValue', (event.target as HTMLInputElement).value);
}

function onBlur() {
  emits('blur');
}
</script>

<style lang="scss" scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.base-input {
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;

  &[aria-invalid='true'] {
    border-color: red;
  }

  &:focus {
    border-color: #999;
  }
}

.error-text {
  color: red;
  margin-top: 0.25rem;
  font-size: 0.9rem;
}
</style>
