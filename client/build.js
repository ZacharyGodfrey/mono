const Eleventy = require('@11ty/eleventy');

(async () => {
  let eleventy = new Eleventy('./src/content', './dist', {
    config: (eleventyConfig) => {
      eleventyConfig.addPassthroughCopy('./src/static');

      return {
        dir: {
          input: './src/content',
          layouts: 'layouts',
          includes: 'includes',
          output: 'dist'
        },
        htmlTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk'
      };
    }
  });

  await eleventy.write();
})();