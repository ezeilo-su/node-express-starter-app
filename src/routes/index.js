const pingRoute = require('./ping');
const postRoute = require('./posts');

const API_PREFIX = '/api';

const bindRoutes = (app) => {
  app.use(`${API_PREFIX}/ping`, pingRoute);
  app.use(`${API_PREFIX}/posts`, postRoute);
};

module.exports = bindRoutes;
