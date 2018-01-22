const NODE_MODULES_ROOT = __dirname;
let ROOT_DIR = '';

/**
 * @param {string} id
 * 
 * @returns Function
 */

function provider(id) {
  let from_node_modules_path = removeNodeModulesPath();

  let req = require(`${from_node_modules_path}/${id}`);
  return req;
}

/**
 * 
 * @param {string} [rootDir] 
 */
function register(rootDir) {
  rootDir ? (ROOT_DIR = rootDir) : (ROOT_DIR = '.');
}

function removeNodeModulesPath() {
  let removeNodeModulesPath = `${NODE_MODULES_ROOT}`;
  removeNodeModulesPath = normalizePath(removeNodeModulesPath);
  let replaced = removeNodeModulesPath.replace('node_modules/node-basedir/src', ROOT_DIR);
  return replaced;
}
/**
 * 
 * @param {string} path 
 * @returns string
 */
function normalizePath(path) {
  return path.replace(/\\/g, '/');
}

module.exports = { register, provider };
