import axios from 'axios';

export interface RatesData {
    USD: number;
    EUR: number;
    RUB: number;
    KZT: number;
}

// запрос к API и парсинг

export async function fetchRates(base: string): Promise<RatesData> {
    // Делаем запрос к указанному API:
    const response = await axios.get('https://status.neuralgeneration.com/api/currency', {
        params: { base }
    });

    // response.data - это объект вроде { "usd-rub": 88.1562, "eur-rub": 101.3841, "rub-usd": 0.0119 ... }
    const data = response.data as Record<string, number>;

    // парсим только что нужно (RUB, USD, EUR)
    return parseRates(base, data);
}

// преобразуем плоский объект (напр. {"usd-rub": 88.15, "rub-usd": 0.0119})
// в вид { USD: ..., EUR: ..., RUB: ... },

function parseRates(base: string, data: Record<string, number>): RatesData {
    // По умолчанию
    const result: RatesData = { USD: 0, EUR: 0, RUB: 0 };

    // Ставим курс самой базовой валюты к ней же = 1
    if (base === 'RUB') {
        result.RUB = 1;
        result.USD = data['usd-rub'] ?? 0;
        result.EUR = data['eur-rub'] ?? 0;
        result.KZT = data['kzt-rub'] ?? 0;

    } else if (base === 'USD') {
        result.USD = 1;
        result.EUR = data['eur-usd'] ?? 0;
        result.RUB = data['rub-usd'] ?? 0;
        result.KZT = data['kzt-usd'] ?? 0;

    } else if (base === 'EUR') {
        result.EUR = 1;
        result.USD = data['usd-eur'] ?? 0;
        result.RUB = data['rub-eur'] ?? 0;
        result.KZT = data['kzt-eur'] ?? 0;
    } else if (base === 'KZT') {
        result.KZT = 1;
        result.USD = data['usd-kzt'] ?? 0;
        result.EUR = data['eur-kzt'] ?? 0;
        result.RUB = data['rub-kzt'] ?? 0;
    }

    return result;
}
