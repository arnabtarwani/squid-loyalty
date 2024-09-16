module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js, ts}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/coverage/**",
    "!**/jest.config.js",
    "!**/babel.config.js",
    "!**/.eslintrc.js",
  ],
  coverageProvider: "babel",
  coverageReporters: ["clover", "json", "lcov", ["text", { skipFull: true }]],
};
