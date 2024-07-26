const { merge } = require('webpack-merge');
const commonConfiguration = require('./webpack.common.js');
const portFinderSync = require('portfinder-sync');
const os = require('os');

const infoColor = (_message) => {
    return `\u001b[1m\u001b[34m${_message}\u001b[39m\u001b[22m`;
};

module.exports = merge(
    commonConfiguration,
    {
        mode: 'development',
        devServer: {
            host: '0.0.0.0',
            port: portFinderSync.getPort(8080),
            static: {
                directory: './dist',
            },
            open: true,
            allowedHosts: 'all',
            client: {
                overlay: true,
            },
            onListening: function (server) {
                const port = server.options.port;
                const https = server.options.https ? 's' : '';

                // 使用 os 模块获取本地 IP 地址
                const networkInterfaces = os.networkInterfaces();
                const localIp = networkInterfaces['en0']?.find(iface => iface.family === 'IPv4')?.address || 'localhost';

                const domain1 = `http${https}://${localIp}:${port}`;
                const domain2 = `http${https}://localhost:${port}`;

                console.log(`Project running at:\n  - ${infoColor(domain1)}\n  - ${infoColor(domain2)}`);
            }
        }
    }
);
