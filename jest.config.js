/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/external/', '/examples/'],
  preset: 'ts-jest',
  verbose: true,
};
