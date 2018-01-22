# node-basedir
### this package fix require path hell like this `../../../../etc`

in your config write
``` js
require('node-basedir').register('<name of base directory>')
```

TODO: just write on `packaje.json` file `"basedir":"./(rootName)"`

##

## usage 
```
-examples
|--some-path
|  |--index.js
|  |--somefile.js
|--test.js
```
``` js
// examples/somfile.js
class SomeClass {
  someMethod() {
    return 5;
  }
}

module.exports = SomeClass;

// examples/index.js
const SomeClass = require('./somefile'); // is equal for const SomeClass = provider('some-path/somefile');

module.exports = { SomeClass };

// test.js
require('node-basedir').register('examples'); // one time only
const { provider } = require('node-basedir');

const { SomeClass } = provider('some-path');

let someClass = new SomeClass();
console.log(someClass.someMethod());

```
## run this example
`node -r node-basedir examples/test.js`
and must return result

``` cmd
5
```