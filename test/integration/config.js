module.exports = exports = {
  config:  {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    seleniumServerJar: '/usr/local/lib/node_modules/protractor/selenium/selenium-server-standalone-2.52.0.jar',
    specs: ['basic-spec.js'],
    onPrepare: function() {
      require('babel-core/register')
    }
  }
};
