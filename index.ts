import { readFileSync } from 'fs';

const NODE_MODULES_ROOT = __dirname;
let ROOT_DIR = '';
let basedir = '';
let packageJsonBaseDir = '';
let packageJsonData: PackageJSON = {};
let isRegisteredBefore = false;

export function provider(id: string): NodeRequire {
  if (!isRegisteredBefore) {
    register();
  }
  isRegisteredBefore = true;
  return require(`${basedir}/${id}`);
}

export function register(RootDir?: string | undefined) {
  if (RootDir) {
    ROOT_DIR = RootDir;
    basedir = setBaseDir(ROOT_DIR);
  } else {
    basedir = setBaseDir();
  }
  isRegisteredBefore = true;
}

function getRootDirectory(): string {
  let removeNodeModulesPath: string = `${NODE_MODULES_ROOT}`;
  removeNodeModulesPath = normalizePath(removeNodeModulesPath);
  let projectRootDir = removeNodeModulesPath.replace('node_modules/node-basedir', '');
  return projectRootDir;
}

/**
 * 
 * @param {string} [basedir] 
 */
function setBaseDir(basedir?: string) {
  let projectRootDir = getRootDirectory();
  if (!basedir) {
    console.info('basedir is not defined. Fetch data from package.json');
    packageJsonData = readJsonFile(projectRootDir + 'package.json');
    packageJsonBaseDir = packageJsonData.baseDir || '';
    return getRootDirectory() + packageJsonBaseDir;
  } else {
    let replaceToBase = projectRootDir + basedir;
    return replaceToBase;
  }
}

function readJsonFile(filePath: string): PackageJSON {
  return (packageJsonData = JSON.parse(readFileSync(filePath, 'utf8')));
}

function normalizePath(path: string): string {
  return path.replace(/\\/g, '/');
}

interface PackageJSON {
  name?: string;
  version?: string;
  description?: string;
  private?: boolean;
  baseDir?: string;
  keywords?: string[];
  author?: string;
  license?: string | string[];
  devDependencies?: {
    [name: string]: string;
  };
  scripts?: {
    [name: string]: string;
  };
  bugs?: {
    url: string;
  };
  repository?: {
    url: string;
  };
  dependencies?: {
    [name: string]: string;
  };
}
