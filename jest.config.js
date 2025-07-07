import { nextJest } from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: {
          // Override for Jest to handle your bundler moduleResolution
          moduleResolution: 'node',
          allowImportingTsExtensions: false,
        },
      },
    ],
  },
  moduleNameMapping: {
    // Update this to match your tsconfig paths
    '^@/(.*)$': '<rootDir>/src/$1',
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testMatch: ['**/__tests__/**/*.test.ts', '**/?(*.)+(spec|test).ts'],
  collectCoverageFrom: [
    // Update paths to match your src structure
    'src/**/*.ts',
    'pages/api/**/*.ts', // Keep this if you have pages/api
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
};

export default createJestConfig(customJestConfig);
