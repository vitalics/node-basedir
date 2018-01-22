const { provider } = require('node-basedir');

const SomeClass = provider('some-path/somefile');

module.exports = { SomeClass };
