const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/send_e2e',
    proxy({
      target: 'https://msgapi.threema.ch',
      changeOrigin: true,
      secure: false,
      onProxyReq: (proxyReq) => {
        proxyReq.setHeader('Origin', 'http://localhost:4200');
      },
    })
  );
};
