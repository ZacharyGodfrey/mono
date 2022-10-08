// Tutorials:
// #1: https://www.youtube.com/watch?v=uzM5lETc6Sg done!
// #2: https://www.youtube.com/watch?v=WTVv5IbPN1k
// #3: https://www.youtube.com/watch?v=ty0_xOxeRCU
module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy('11-src/assets');

  return {
    dir: {
      input: '11-src/content',
      layouts: 'layouts',
      includes: 'includes',
      output: '11-dist'
    },
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
};