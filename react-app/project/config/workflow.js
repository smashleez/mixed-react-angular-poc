

function setConfig(config) {
  config.development.port = 7777;
  config.development.hotLoader = {
    enabled: true,
    experimental: true,
  };

  return config;
}

module.exports = setConfig;
