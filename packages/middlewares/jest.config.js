// jest.config.js
// const {defaults} = require('jest-config');
module.exports = {
  // ...
  // testRegex: '.test.js',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ]
  // moduleFileExtensions: [...defaults.moduleFileExtensions],
  // ...
}
