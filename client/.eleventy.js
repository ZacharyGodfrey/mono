const path = require('path');
const fs = require('fs-extra');

// Tutorials:
// #1: https://www.youtube.com/watch?v=uzM5lETc6Sg done!
// #2: https://www.youtube.com/watch?v=WTVv5IbPN1k
// #3: https://www.youtube.com/watch?v=ty0_xOxeRCU
module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy('src/static');

  eleventyConfig.addFilter('asBase64', (fileName) => {
    const filePath = path.resolve(__dirname, `./src/content/_includes/${fileName}`);

    return fs.readFileSync(filePath, { encoding: 'base64' });
  });

  return {
    dir: {
      input: 'src/content',
      includes: '_includes',
      output: 'dist'
    },
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
};