const { provider } = require('node-basedir');

const { SomeClass } = provider('some-path');

let someClass = new SomeClass();
console.log(someClass.someMethod());
