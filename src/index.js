const fs = require('fs');

const NODE_MODULES_ROOT = __dirname;
let ROOT_DIR = '';
let basedir = '';
let packageJsonBaseDir = '';
let isRegisteredBefore = false;
/**
 * @param {string} id
 * 
 * @returns NodeRequire
 */

function provider(id) {
  if (!isRegisteredBefore) {
    register();
  }
  isRegisteredBefore = true;
  return require(`${basedir}/${id}`);
}

/**
 * 
 * @param {string} [RootDir] 
 */
function register(RootDir) {
  if (RootDir) {
    ROOT_DIR = RootDir;
    basedir = setBaseDir(ROOT_DIR);
  } else {
    basedir = setBaseDir();
  }
  isRegisteredBefore = true;
}

function getRootDirectory() {
  let removeNodeModulesPath = `${NODE_MODULES_ROOT}`;
  removeNodeModulesPath = normalizePath(removeNodeModulesPath);
  let projectRootDir = removeNodeModulesPath.replace('node_modules/node-basedir/src', '');
  return projectRootDir;
}

/**
 * 
 * @param {string} [basedir] 
 */
function setBaseDir(basedir) {
  let projectRootDir = getRootDirectory();
  if (!basedir) {
    console.info('basedir is not defined. Fetch data from package.json');
    let packageJsonData = readJsonFile(projectRootDir + 'package.json');
    packageJsonBaseDir = packageJsonData.baseDir;
    return getRootDirectory() + packageJsonBaseDir;
  } else {
    let replaceToBase = projectRootDir + basedir;
    return replaceToBase;
  }
}

/**
 * 
 * @param {string} filePath 
 * 
 * @returns JSON
 */
function readJsonFile(filePath) {
  return (packageJsonData = JSON.parse(fs.readFileSync(filePath, 'utf8')));
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
