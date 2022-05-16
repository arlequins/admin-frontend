const path = require("path");

module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: (config, env) => ({
    ...config,
    entry: env === 'production' ? path.resolve(__dirname, "src/index.production") : config.entry,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        "@app": path.resolve(__dirname, "src/"),
        "@custom": path.resolve(__dirname, "src/types/custom/"),
        "@typings": path.resolve(__dirname, "src/types/typings/"),
      }
    }
  }),
  // The Jest config to use when running your jest tests - note that the normal rewires do not
  // work here.
  jest: (config) => ({
    ...config,
    moduleNameMapper: {
      ...config.moduleNameMapper,
      "\\.(css|less|sass|scss)$": "<rootDir>/config/__mocks__/styleMock.js",
      "\\.(gif|ttf|eot|svg)$": "<rootDir>/config/__mocks__/fileMock.js",
      "@app/(.*)$": "<rootDir>/src/$1",
      "@custom/(.*)$": "<rootDir>/src/types/custom/$1",
      "@typings/(.*)$": "<rootDir>/src/types/typings/$1",
    },
  })
}
