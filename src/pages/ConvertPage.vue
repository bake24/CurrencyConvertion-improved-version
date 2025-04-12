<template>
  <section class="convert-page">
    <div v-if="currencyStore.loading" class="loader">Loading rates...</div>
    <div v-else-if="currencyStore.error" class="error-text">
      {{ currencyStore.error }}
    </div>
    <div v-else-if="!hasRates" class="loader">Loading rates...</div>
    <div v-else class="conversion-card">
      <h2>Currency Conversion</h2>
      <CurrencyConverterForm />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useCurrencyStore } from '@/store/currency';
import CurrencyConverterForm from '@/components/features/CurrencyConverterForm.vue';

const currencyStore = useCurrencyStore();

const hasRates = computed(() => Object.keys(currencyStore.rates).length > 0);

onMounted(() => {
  if (!hasRates.value) {
    currencyStore.loadRates();
  }
});
</script>

<style lang="scss" scoped>
.convert-page {
  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 250px;

  .loader {
    font-weight: bold;
  }
  .error-text {
    color: red;
    font-weight: bold;
  }
}

.conversion-card {
  background-color: #cfe3ff;
  padding: 2rem;
  border-radius: 12px;
  width: 400px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);

  h2 {
    margin-bottom: 1rem;
    text-align: center;
  }
}
</style>
