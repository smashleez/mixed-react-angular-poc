'use strict';

var path = require('path');
var glob = require('glob');
var commonRoutes = glob.sync('./project/config/routes/common/**/*.json');
var appRoutes = glob.sync('./project/config/routes/!(common)/**/*.json');

var allRoutes = commonRoutes.concat(appRoutes);

var developerConfig = {

  development: {

    data: path.join(__dirname, '../data'),
    routes: allRoutes,

    servers: {
      web: {
        host: '127.0.0.1',
        port: 9998
      },
      app: {
        host: '127.0.0.1',
        port: 3232
      },
      api: {
        proxy: true,
        port: 9998,
        headers: {
          RemoteUser: 'jdoe'
        },
        proxies: [
          {
            context: '/api',
            rewrite: {
              from: '^/api',
              to: ''
            }
          }
        ]
      }
    }
  },

  production: {

    data: path.join(__dirname, '../data'),
    routes: allRoutes,

    latency: 300,
    user: null,
    cache: 86400000,
    limit: '50mb',

    servers: {
      web: {
        host: '127.0.0.1',
        port: 9998
      }
    }
  }

};

module.exports = developerConfig;
