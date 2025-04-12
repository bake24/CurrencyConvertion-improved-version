<template>
  <div class="converter-form">
    <!-- Первая строка (верхняя) -->
    <div class="converter-row">
      <BaseDropdown
          :modelValue="topCurrency"
          :options="currencies"
          @update:modelValue="val => topCurrency = val"
          aria-label="Выберите валюту для верхнего поля"
      />
      <BaseInput
          :modelValue="topValueStr"
          @update:modelValue="onTopInput"
          :error="topError"
          aria-label="Сумма верхнего поля"
      />
    </div>

    <!-- Вторая строка (нижняя) -->
    <div class="converter-row">
      <BaseDropdown
          :modelValue="bottomCurrency"
          :options="currencies"
          @update:modelValue="val => bottomCurrency = val"
          aria-label="Выберите валюту для нижнего поля"
      />
      <BaseInput
          :modelValue="bottomValueStr"
          @update:modelValue="onBottomInput"
          :error="bottomError"
          aria-label="Сумма нижнего поля"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseDropdown from '@/components/ui/BaseDropdown.vue';
import BaseInput from '@/components/ui/BaseInput.vue';

// отдельный composable, который содержит логику пересчёта
import { useConversion } from '@/composables/useConversion';


const currencies = ['USD', 'EUR', 'RUB', 'KZT'];

// Подключаем composable
const {
  topCurrency,
  bottomCurrency,
  topValueStr,
  bottomValueStr,
  topError,
  bottomError,
  setTopValue,
  setBottomValue
} = useConversion('1000', 'RUB', 'USD');


 // Функции-обёртки для BaseInput (верхнего и нижнего)

function onTopInput(value: string) {
  setTopValue(value);
}
function onBottomInput(value: string) {
  setBottomValue(value);
}
</script>

<style lang="scss" scoped>
.converter-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.converter-row {
  display: flex;
  gap: 1rem;
  align-items: center;
}


.converter-row :focus,
.converter-row :hover {
  transition: box-shadow 0.2s ease;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
}
</style>
