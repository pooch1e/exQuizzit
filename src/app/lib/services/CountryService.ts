import { prisma } from '../prisma';
import { countries } from '../../../data/development-data/countries-data.js';

interface Country {
  userId: number;
  name: string;
  flagUrl: string;
  capital: string;
  currency: string;
  population: number;
}
export class CountryService {
  async getCountries(): Promise<Country[]> {
    //fetch from supabase
    try {
      const countriesFromDb = await prisma.countries.findMany({
        select: {
          userId: true,
          name: true,
          flagUrl: true,
          capital: true,
          currency: true,
          population: true,
        },
      });
      return countriesFromDb;
    } catch (err) {
      console.log(err, 'err fetching from supabase');

      return this.getFallbackCountries();
    }
  }
  private getFallbackCountries(): Country[] {
    return countries.slice(0, 30);
  }
}
