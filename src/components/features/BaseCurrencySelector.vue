<template>
  <BaseDropdown
      :modelValue="currencyStore.baseCurrency"
      :options="availableCurrencies"
      @update:modelValue="onBaseCurrencyChange"
  />
</template>

<script setup lang="ts">
import { useCurrencyStore } from '@/store/currency';
import BaseDropdown from '@/components/ui/BaseDropdown.vue';

// 4 осные валюты
const availableCurrencies = ['USD', 'EUR', 'RUB', 'KZT'];

const currencyStore = useCurrencyStore();

async function onBaseCurrencyChange(newBase: string) {
  await currencyStore.setBaseCurrency(newBase);
}
</script>
