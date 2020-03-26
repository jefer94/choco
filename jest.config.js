module.exports = {
  testEnvironment: "node",
  moduleFileExtensions: ['js', 'jsx', 'json'],
  transform: {
    "^.+\\.[t|j]sx?$": ["babel-jest", { cwd: __dirname }]
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/']
};