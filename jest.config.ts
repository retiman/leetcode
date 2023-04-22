import type { Config } from '@jest/types';

// See https://jestjs.io/docs/configuration
export default async (): Promise<Config.InitialOptions> => {
  return {
    clearMocks: true,
    collectCoverage: true,
    modulePaths: [
      '<rootDir>'
    ],
    modulePathIgnorePatterns: [
      'dist'
    ],
    testTimeout: 10000,
    testMatch: ['**/*.test.ts'],
    verbose: true
  }
};
