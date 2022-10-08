const path = require('path');
const fs = require('fs-extra');
const Eleventy = require('@11ty/eleventy');

const resolve = (filePath) => {
  return path.resolve(path.join(__dirname, filePath));
};

const readFile = (filePath, encoding) => {
  return fs.readFileSync(resolve(filePath), { encoding: encoding || 'utf-8' });
};

const writeFile = (filePath, content, encoding) => {
  return fs.outputFileSync(resolve(filePath), content, { encoding: encoding || 'utf-8' });
};

const deleteFile = (filePath) => {
  return fs.removeSync(resolve(filePath));
};

const writeHtml = async () => {
  const eleventy = new Eleventy('./src/content', './dist', {
    configPath: '.eleventy.js',
    quietMode: true
  });

  await eleventy.write();
};

(async () => {
  const font = readFile('./src/satisfy.ttf', 'base64');
  const favicon = readFile('./src/favicon.png', 'base64');

  writeFile('./src/content/includes/_temp/font.base64', font);
  writeFile('./src/content/includes/_temp/favicon.base64', favicon);

  await writeHtml();

  deleteFile('./src/content/includes/_temp');
})();