const { environment } = require('@rails/webpacker')
environment.config.externals = [
  { routes: 'Routes' }
];

module.exports = environment
