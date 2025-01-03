const baseUrl = 'https://pro-api.coinmarketcap.com';
const apiKey = process.env.API_KEY ?? '';

export const query = async (symbol: string): Promise<number | undefined> => {
  const key = String(symbol).toUpperCase();
  const path = '/v2/cryptocurrency/quotes/latest';
  const search = `?symbol=${key}`;
  const res = await fetch(baseUrl + path + search, {
    headers: {
      'X-CMC_PRO_API_KEY': apiKey,
    },
    method: 'GET',
  });

  try {
    const json = await res.json();
    return json?.status?.error_code === 0 ? json.data[key][0].quote.USD.price : undefined;
  } catch {
    return undefined;
  }
};
