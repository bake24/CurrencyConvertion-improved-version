<template>
  <section class="home-page">
    <div v-if="currencyStore.loading" class="loader">Загрузка курсов...</div>
    <div v-else-if="currencyStore.error" class="error-text">
      {{ currencyStore.error }}
    </div>
    <div v-else-if="!hasRates" class="loader">Загрузка курсов...</div>
    <div v-else class="cards-container">
      <!--  3 карточки в ряд -->
      <div
          v-for="cur in filteredCurrencies"
          :key="cur"
          class="currency-card"
      >

        <img :src="getIcon(cur)" :alt="cur" class="currency-icon" />

        <div class="currency-value">
          1 {{ cur }} = {{ formatRate(cur) }} {{ currencyStore.baseCurrency }}
        </div>

        <div class="currency-description">
          Текущий обменный курс {{ getFullName(cur) }} к
          {{ getFullName(currencyStore.baseCurrency) }}.
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useCurrencyStore } from '@/store/currency';

// Подключаем store с курсами.
const currencyStore = useCurrencyStore();
const allCurrencies = ['USD', 'EUR', 'RUB', 'KZT'];

// Отфильтровываем, чтобы не показывать саму базовую валюту;
// в итоге будет 4 валюты для карточек.

const filteredCurrencies = computed(() =>
    allCurrencies.filter((c) => c !== currencyStore.baseCurrency)
);

const hasRates = computed(() => {
  const keys = Object.keys(currencyStore.rates || {});
  return keys.length > 0;
});

onMounted(() => {
  if (!hasRates.value) {
    currencyStore.loadRates();
  }
});

function getIcon(cur: string) {
  switch (cur) {
    case 'USD':
      return new URL('@/assets/icons/dollar.png', import.meta.url).href;
    case 'EUR':
      return new URL('@/assets/icons/euro.png', import.meta.url).href;
    case 'RUB':
      return new URL('@/assets/icons/ruble.png', import.meta.url).href;
    case 'KZT':
      return new URL('@/assets/icons/tenge.png', import.meta.url).href;
    default:
      return '';
  }
}


function getFullName(cur: string) {
  switch (cur) {
    case 'USD': return 'USD';
    case 'EUR': return 'EUR';
    case 'RUB': return 'RUB';
    case 'KZT': return 'KZT';
    default: return cur;
  }
}


// Выводим курс, округляя до 2 знаков.

function formatRate(cur: string) {
  if (!currencyStore.rates[cur]) return 'N/A';
  return currencyStore.rates[cur].toFixed(2);
}
</script>

<style lang="scss" scoped>
.home-page {
  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
  min-height: 250px;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  max-width: 1200px;
  width: 100%;
}

.currency-card {
  background-color: #cbe1ff;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 250px;

  .currency-icon {
    width: 48px;
    height: 48px;
    margin-bottom: 1rem;
  }
  .currency-value {
    font-weight: bold;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  .currency-description {
    font-size: 0.9rem;
    color: #555;
  }
}

.loader {
  font-weight: bold;
}
.error-text {
  color: red;
  font-weight: bold;
}
</style>
