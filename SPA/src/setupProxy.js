const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5000', // Old backend
            changeOrigin: true,
        })
    );

    app.use(
        '/api/allergies',
        createProxyMiddleware({
            target: 'http://localhost:4000', // New backend
            changeOrigin: true,
        })
    );
};
