// Tutorial:
// https://www.youtube.com/watch?v=uzM5lETc6Sg
module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy('11-src/static');

  return {
    dir: {
      input: '11-src',
      layouts: 'layouts',
      includes: 'includes',
      output: '11-dist'
    },
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
};