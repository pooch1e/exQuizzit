import { prisma } from '../prisma';
export class CountryService {
  async getCountries(): Promise<Country[]> {
    //fetch from supabase
    try {
      const countries = await prisma.countries.findMany({
        select: {
          userId: true,
          name: true,
          flagUrl: true,
          capital: true,
          currency: true,
          population: true,
        },
      });
      return countries;
    } catch (err) {
      console.log('err fetching from supabase');

      return this.getFallbackCountries();
    }
  }
  private getFallbackCountries(): Country[] {
    
    return countries.slice(0, 30); 
  }
}
