import { defineStore } from 'pinia';
import { fetchRates } from '@/services/currencyApi';

export const useCurrencyStore = defineStore('currency', {
    state: () => ({
        baseCurrency: 'RUB',
        rates: {} as Record<string, number>,
        loading: false,
        error: null as string | null
    }),

    actions: {
        async setBaseCurrency(newBase: string) {
            this.baseCurrency = newBase;
            await this.loadRates();
        },

        async loadRates() {
            this.loading = true;
            this.error = null;
            try {
                // Каждый раз делаем новый запрос к API
                const data = await fetchRates(this.baseCurrency);
                this.rates = data;
            } catch (err: unknown) {
                this.error = 'Ошибка при загрузке курсов валют';
            } finally {
                this.loading = false;
            }
        }
    },

    getters: {
        getRate: (state) => (currency: string) => {
            return state.rates[currency] ?? 0;
        }
    }
});
