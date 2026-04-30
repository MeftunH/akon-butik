/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: { isolatedModules: true } }],
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  collectCoverageFrom: ['**/*.ts', '!**/*.spec.ts', '!**/*.dto.ts', '!main.ts'],
  coverageDirectory: '../coverage',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};
