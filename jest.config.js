module.exports = {
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
