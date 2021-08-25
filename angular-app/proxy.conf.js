const PROXY_CONFIG = [
  {
    context: [],
    target: "https://rmhcpdev.availity.net/",
    secure: false,
    changeOrigin: true,
    logLevel: "debug",
    headers: {
      'Authorization': 'JWS <token>'
    }
  }
]

module.exports = PROXY_CONFIG;
