const path = require('path');
const fs = require('fs-extra');
const scss = require('node-sass');
const glob = require('glob');

const resolve = (filePath) => {
  return path.resolve(path.join(__dirname, filePath));
};

const listFiles = (pattern) => {
  return glob.sync(pattern, { cwd: resolve('./') });
};

const readFile = (filePath, encoding) => {
  return fs.readFileSync(resolve(filePath), { encoding: encoding || 'utf-8' });
};

const writeFile = (filePath, content, encoding) => {
  return fs.outputFileSync(resolve(filePath), content, { encoding: encoding || 'utf-8' });
};

const emptyFolder = (folderPath) => {
  return fs.emptyDirSync(resolve(folderPath));
};

const copyFolder = (srcPath, destPath) => {
  return fs.copySync(resolve(srcPath), resolve(destPath));
};

const compileSCSS = (fileContent) => {
  return scss.renderSync({ data: fileContent, outputStyle: 'compressed' }).css.toString().trim();
};

// Read Input

const shell = readFile('./src/shell.html');
const favicon = readFile('./src/favicon.png', 'base64');
const font = readFile('./src/satisfy.ttf', 'base64');
const style = compileSCSS(readFile('./src/style.scss'));
const pages = listFiles('./src/pages/**/*.*').map(filePath => ({
  name: filePath.split('/src/pages/')[1],
  content: readFile(`./${filePath}`)
}));

const baseFile = shell
  .replace('//favicon', favicon)
  .replace('//font', font)
  .replace('/* style */', style);

// Write Output

emptyFolder('./dist');
copyFolder('./src/static', './dist');

pages.forEach(page => {
  const fileName = page.name.split('.').slice(0, -1).join('.');
  const filePath = `./dist/${fileName === 'home' ? 'index' : fileName}.html`;
  const fileContent = baseFile.replace('<!-- content -->', page.content);

  writeFile(filePath, fileContent);
});