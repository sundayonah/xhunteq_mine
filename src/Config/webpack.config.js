const webpack = require("webpack");

module.exports = function override(config, env) {
  // ...
  config.resolve.fallback = {
    http: require.resolve("stream-http"),
    url: false,
  };

  // ...
  return config;
};
