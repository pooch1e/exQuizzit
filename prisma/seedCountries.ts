import fs from 'fs';
import fetch from 'node-fetch';

interface Country {
  name?: { common?: string };
  flags?: { png?: string };
  capital?: string[];
  currencies?: Record<string, unknown>;
  population?: number;
}

interface FormattedCountry {
  userId: number;
  name: string;
  flagUrl: string;
  capital: string;
  currency: string;
  population: number;
}

const API_URL = 'https://restcountries.com/v3.1/all?fields=name,flags,currencies,capital,population';

const run = async (): Promise<void> => {
  try {
    const res = await fetch(API_URL);
    const countries: Country[] = await res.json();

    const formatted: FormattedCountry[] = countries.map((c, index) => ({
      userId: index + 1,
      name: c.name?.common || 'Unknown',
      flagUrl: c.flags?.png || '',
      capital: Array.isArray(c.capital) ? c.capital[0] : 'N/A',
      currency: c.currencies ? Object.keys(c.currencies)[0] : 'N/A',
      population: c.population || 0
    }));

    fs.writeFileSync('./prisma/countriesSeed.json', JSON.stringify(formatted, null, 2));
    console.log('✅ Seed file created: prisma/countriesSeed.json');
  } catch (err) {
    console.error('❌ Failed to fetch or write:', err);
  }
};

run();