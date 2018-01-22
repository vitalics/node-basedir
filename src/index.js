const NODE_MODULES_ROOT = __dirname;
let ROOT_DIR = 'examples';

/**
 * 
 * @param {string} id 
 * @returns any
 */
global.provider = function(id) {
  let from_node_modules_path = removeNodeModulesPath();
  if (ROOT_DIR !== '') {
    return require(`${from_node_modules_path}/${id}`);
  }
  return require(`${from_node_modules_path}${id}`);
};

/**
 * @description hack for experted member
 * 
 * @param {string} id
 */
function provider(id) {
  return global.provider(id);
}

/**
 * 
 * @param {string} rootDir 
 */
function register(rootDir) {
  ROOT_DIR = rootDir;
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
