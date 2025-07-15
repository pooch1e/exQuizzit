import { prisma } from '../src/app/lib/prisma.ts';
import { seedTestDatabase } from '../prisma/seed-test-db.ts';
import {
  cleanTestDatabase,
  resetTestSequences,
} from '../src/app/lib/prisma.ts';

beforeEach(async () => {
  // Clean and re-seed before each test in this suite
  await cleanTestDatabase();
  await resetTestSequences();
  await seedTestDatabase(prisma);
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('testing test-seed database', () => {
  test.skip('should find seeded countries table', async () => {
    // console.log(process.env) //showing test env
    const countries = await prisma.countries.findMany();
    expect(countries.length).toBeGreaterThan(0);
  });

  describe.skip('test countries table', () => {
    test('Countries has user id column', async () => {
      const country = await prisma.countries.findFirst({
        where: {
          userId: 1,
        },
      });
      expect(country).toHaveProperty('userId');
      expect(country).not.toBeUndefined();
    });
    test('User id is of type number', async () => {
      const country = await prisma.countries.findFirst({
        where: {
          userId: 1,
        },
      });
      expect(typeof country?.userId).toBe('number');
    });
    test('Countries table has country name', async () => {
      const country = await prisma.countries.findFirst({
        where: {
          name: 'Japan',
        },
      });
      expect(country).toHaveProperty('name');
      expect(country?.name).not.toBeUndefined();
    });
    test('Country name is a string', async () => {
      const country = await prisma.countries.findFirst({
        where: {
          name: 'Japan',
        },
      });
      expect(typeof country?.name).toBe('string');
    });
    test('Country has flag url', async () => {
      const country = await prisma.countries.findFirst({
        where: {
          flagUrl: 'https://flagcdn.com/w320/jp.png',
        },
      });
      expect(country).toHaveProperty('flagUrl');
      expect(country?.flagUrl).not.toBeUndefined();
    });
    test('Country flag is a string', async () => {
      const country = await prisma.countries.findFirst({
        where: {
          flagUrl: 'https://flagcdn.com/w320/jp.png',
        },
      });
      expect(typeof country?.flagUrl).toBe('string');
    });
    test('Country has capital city', async () => {
      const country = await prisma.countries.findFirst({
        where: {
          capital: 'Tokyo',
        },
      });
      expect(country).toHaveProperty('capital');
      expect(country).not.toBeUndefined();
    });
    test('Capital city is a string', async () => {
      const country = await prisma.countries.findFirst({
        where: {
          capital: 'Tokyo',
        },
      });
      expect(typeof country?.capital).toBe('string');
    });
    test('Country has currency', async () => {
      const country = await prisma.countries.findFirst({
        where: {
          currency: 'JPY',
        },
      });
      expect(country).toHaveProperty('currency');
      expect(country).not.toBeUndefined();
    });
    test('Currency is a number', async () => {
      const country = await prisma.countries.findFirst({
        where: {
          currency: 'JPY',
        },
      });
      expect(typeof country?.currency).toBe('string');
    });
    test('Country has population', async () => {
      const country = await prisma.countries.findFirst({
        where: {
          population: 125800000,
        },
      });
      expect(country).toHaveProperty('population');
      expect(country).not.toBeUndefined();
    });
    test('Population is a number', async () => {
      const country = await prisma.countries.findFirst({
        where: {
          population: 125800000,
        },
      });
      expect(typeof country?.population).toBe('number');
    });
  });

  test('should find seeded users table', async () => {
    // console.log(process.env) //showing test env
    const user = await prisma.user.findMany();
    expect(user.length).toBeGreaterThan(0);
  });

  describe.skip('test users table', () => {
    test('user has userId column', async () => {
      const user = await prisma.user.findFirst({
        where: {
          userId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        },
      });
      expect(user).toHaveProperty('userId');
      expect(user?.userId).not.toBeUndefined();
    });

    test('userId is of type string', async () => {
      const user = await prisma.user.findFirst({
        where: {
          userId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        },
      });
      expect(typeof user?.userId).toBe('string');
    });

    test('user to have email column', async () => {
      const user = await prisma.user.findFirst({
        where: {
          email: 'alice@example.com',
        },
      });
      expect(user).toHaveProperty('email');
      expect(user?.email).not.toBeUndefined();
    });

    test('email is of type string', async () => {
      const user = await prisma.user.findFirst({
        where: {
          email: 'alice@example.com',
        },
      });
      expect(typeof user?.email).toBe('string');
    });

    test('user to have userName column', async () => {
      const user = await prisma.user.findFirst({
        where: {
          userName: 'Alice',
        },
      });
      expect(user).toHaveProperty('userName');
      expect(user?.userName).not.toBeUndefined();
    });

    test('userName is of type string', async () => {
      const user = await prisma.user.findFirst({
        where: {
          userName: 'Alice',
        },
      });
      expect(typeof user?.userName).toBe('string');
    });

    test('user to have avatar column', async () => {
      const user = await prisma.user.findFirst({
        where: {
          avatar: 'https://api.dicebear.com/6.x/thumbs/svg?seed=Alice',
        },
      });
      expect(user).toHaveProperty('avatar');
      expect(user?.avatar).not.toBeUndefined();
    });

    test('avatar is of type string', async () => {
      const user = await prisma.user.findFirst({
        where: {
          avatar: 'https://api.dicebear.com/6.x/thumbs/svg?seed=Alice',
        },
      });
      expect(typeof user?.avatar).toBe('string');
    });

    test('user to have highScore column', async () => {
      const user = await prisma.user.findFirst({
        where: {
          highScore: 1200,
        },
      });
      expect(user).toHaveProperty('highScore');
      expect(user?.highScore).not.toBeUndefined();
    });

    test('highScore is of type string', async () => {
      const user = await prisma.user.findFirst({
        where: {
          highScore: 1200,
        },
      });
      expect(typeof user?.highScore).toBe('number');
    });

    test('user to have quizzBuckTotal column', async () => {
      const user = await prisma.user.findFirst({
        where: {
          quizzBuckTotal: 500,
        },
      });
      expect(user).toHaveProperty('quizzBuckTotal');
      expect(user?.quizzBuckTotal).not.toBeUndefined();
    });

    test('quizzBuckTotal is of type string', async () => {
      const user = await prisma.user.findFirst({
        where: {
          quizzBuckTotal: 500,
        },
      });
      expect(typeof user?.quizzBuckTotal).toBe('number');
    });

    test('user to have questionsCorrect column', async () => {
      const user = await prisma.user.findFirst({
        where: {
          questionsCorrect: 87,
        },
      });
      expect(user).toHaveProperty('questionsCorrect');
      expect(user?.questionsCorrect).not.toBeUndefined();
    });

    test('questionsCorrect is of type string', async () => {
      const user = await prisma.user.findFirst({
        where: {
          questionsCorrect: 87,
        },
      });
      expect(typeof user?.questionsCorrect).toBe('number');
    });

    test('user to have createdAt column', async () => {
      const user = await prisma.user.findFirst({
        where: {
          createdAt: new Date('2024-07-01T10:00:00Z'),
        },
      });
      expect(user).toHaveProperty('createdAt');
      expect(user?.createdAt).not.toBeUndefined();
    });

    test('createdAt is of type string', async () => {
      const user = await prisma.user.findFirst({
        where: {
          createdAt: new Date('2024-07-01T10:00:00Z'),
        },
      });
      console.log(user?.createdAt);
      expect(user?.createdAt instanceof Date).toBe(true);
    });
  });

  test('should find seeded games table', async () => {
    // console.log(process.env) //showing test env
    const game = await prisma.game.findMany();
    expect(game.length).toBeGreaterThan(0);
    console.log(game); // ensuring test is working
  });
});

describe.skip('testing games table', () => {
  test('games has user id column', async () => {
    const game = await prisma.game.findFirst({
      where: {
        id: 'game-001',
      },
    });
    expect(game).toHaveProperty('id');
    expect(game).not.toBeUndefined();
  });
  test('games has user id column', async () => {
    const game = await prisma.game.findFirst({
      where: {
        id: 'game-001',
      },
    });
    expect(typeof game?.id).toBe('string');
  });
  test('games has user score column', async () => {
    const game = await prisma.game.findFirst({
      where: {
        score: 1200,
      },
    });
    expect(game).toHaveProperty('score');
    expect(game).not.toBeUndefined();
  });
  test('games has score column', async () => {
    const game = await prisma.game.findFirst({
      where: {
        score: 1200,
      },
    });
    expect(typeof game?.score).toBe('number');
  });
  test('games has user created_at column', async () => {
    const game = await prisma.game.findFirst({
      where: {
        createdAt: '2024-07-01T10:15:00Z',
      },
    });
    expect(game).toHaveProperty('createdAt');
    expect(game).not.toBeUndefined();
  });
  test('games has created At column', async () => {
    const game = await prisma.game.findFirst({
      where: {
        createdAt: '2024-07-01T10:15:00Z',
      },
    });
    expect(game?.createdAt instanceof Date).toBe(true);
  });
  test('games has user userId column', async () => {
    const game = await prisma.game.findFirst({
      where: {
        userId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      },
    });
    expect(game).toHaveProperty('userId');
    expect(game).not.toBeUndefined();
  });
  test('games has created At column', async () => {
    const game = await prisma.game.findFirst({
      where: {
        userId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      },
    });
    expect(typeof game?.userId).toBe('string');
  });
});
