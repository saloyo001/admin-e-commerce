
module.exports = {
  testEnvironment: 'jsdom',

  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },

  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.js'],

  testMatch: [
    '**/?(*.)+(test).[jt]s?(x)',
  ],

  clearMocks: true,
}
