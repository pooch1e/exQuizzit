This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
# npm packages

npm install uuid
npm install react-icons
npm install react-countup
npm install he
npm install --save-dev @types/he

# Creating DB

for testing - create .env.test file

create your database eg in

```psql
createdb my_test_database;

confirm it is created
psql \d

add to .env.test file
DATABASE_URL = my_test_database


SEED TEST DB WITH TEST DATA
seed:test": "NODE_ENV=test ts-node prisma/seed.ts", -- not sure if working

# Jest for Test-DB

*Add to package.json under* 'scripts'
- "dev": "next dev",
- "build": "next build",
- "start": "next start",
- "lint": "next lint",
- "test": "NODE_ENV=test jest",
- "test:watch": "NODE_ENV=test jest --watch",
- "test:db:push": "dotenv -e .env.test -- npx prisma db push",
- "test:db:migrate": "dotenv -e .env.test -- npx prisma migrate deploy",
- "test:db:reset": "dotenv -e .env.test -- npx prisma migrate reset --force",
- "test:db:studio": "dotenv -e .env.test -- npx prisma studio",
- "db:seed": "tsx prisma/seed.ts"
and to 'prisma'
"seed": "tsx prisma/seed.ts"

create jest.config.js file



setup

# Install dotenv-cli if you haven't

npm install -D dotenv-cli

# Also tsx

npm install tsx

# Push your schema to the test database

npm run test:db:push

# Or if you prefer migrations

npm run test:db:migrate
```

To test database, will have to add to test-seed file any new models and reintergrate. Then in test suite, set up and tear down db before each test.

# API/ROUTES

# SERVICES

- util classes for api fetching and handling

* Responsiblities
  - TriviaService: Handles external API calls, timeouts, error handling
  - CountryService: Manages data access (database/fallback data)
  - QuizService: Contains logic for question generation
  - API Handler: Orchestrates services and handles HTTP concerns
