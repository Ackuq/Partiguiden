const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');

module.exports = withCSS(
  withSass({
    target: 'serverless',
    webpack(config) {
      const env = Object.keys(process.env).reduce((acc, curr) => {
        acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
        return acc;
      }, {});
      config.plugins.push(new webpack.DefinePlugin(env));
      return config;
    }
  })
);
