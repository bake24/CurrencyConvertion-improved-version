import { ref, watch } from 'vue';
import { useCurrencyStore } from '@/store/currency';

/**
 * Дебаунс-функция для снижения количества пересчётов.
 */
function debounce<T extends (...args: any[]) => void>(fn: T, delay = 300): T {
    let timeout: ReturnType<typeof setTimeout>;
    return ((...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    }) as T;
}

export function useConversion(initialTop = '1000', initialTopCur = 'RUB', initialBotCur = 'USD') {
    const currencyStore = useCurrencyStore();

    const topCurrency = ref(initialTopCur);
    const bottomCurrency = ref(initialBotCur);

    // Значения в строковом формате
    const topValueStr = ref(initialTop);
    const bottomValueStr = ref('');

    // Ошибки валидации
    const topError = ref<string | null>(null);
    const bottomError = ref<string | null>(null);

    /**
     * Функция пересчёта:
     * - source='top' => пересчитываем нижнее поле
     * - source='bottom' => пересчитываем верхнее
     */
    function recalc(source: 'top' | 'bottom') {
        topError.value = null;
        bottomError.value = null;

        const topNum = parseNumber(topValueStr.value);
        const bottomNum = parseNumber(bottomValueStr.value);

        if (topNum === null) topError.value = 'Неверное число';
        if (bottomNum === null) bottomError.value = 'Неверное число';

        const topRate = currencyStore.getRate(topCurrency.value);
        const bottomRate = currencyStore.getRate(bottomCurrency.value);

        if (source === 'top' && topNum !== null) {
            const baseValue = topNum * topRate;
            bottomValueStr.value =
                bottomRate !== 0 ? formatNumber(baseValue / bottomRate) : '0.00';
        }

        if (source === 'bottom' && bottomNum !== null) {
            const baseValue = bottomNum * bottomRate;
            topValueStr.value =
                topRate !== 0 ? formatNumber(baseValue / topRate) : '0.00';
        }
    }

    // Обёртка над recalc с дебаунсингом
    const debouncedRecalc = debounce(recalc, 300);

    // При изменении валют пересчитываем, считая верхнюю ведущей
    watch([topCurrency, bottomCurrency], () => {
        recalc('top');
    });

    // Изначальный пересчёт
    recalc('top');

    // Утилиты
    function parseNumber(value: string): number | null {
        const num = Number(value);
        return isNaN(num) ? null : num;
    }
    function formatNumber(num: number) {
        return num.toFixed(2);
    }

    // Обёртки для изменения значений
    function setTopValue(val: string) {
        topValueStr.value = val;
        debouncedRecalc('top');
    }
    function setBottomValue(val: string) {
        bottomValueStr.value = val;
        debouncedRecalc('bottom');
    }

    return {
        topCurrency,
        bottomCurrency,
        topValueStr,
        bottomValueStr,
        topError,
        bottomError,
        setTopValue,
        setBottomValue,
    };
}
