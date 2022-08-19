const path = require('path');
const { removeLoaders, loaderByName, addBeforeLoader } = require('@craco/craco');

const alias = require('./src/config/aliases');

const SRC = './src';
const aliases = alias(SRC);

const resolvedAliases = Object.fromEntries(
  Object.entries(aliases).map(([key, value]) => [key, path.resolve(__dirname, value)])
);

module.exports = {
  webpack: {
    alias: resolvedAliases,
    configure: function (webpackConfig) {
      const svgLoader = {
        test: /\.svg$/i,
        oneOf: [
          {
            resourceQuery: /raw/,
            type: 'asset/source',
          },
          {
            type: 'asset/resource',
          },
        ],
      };

      // addBeforeLoader(webpackConfig, loaderByName('file-loader'), svgLoader);
      webpackConfig.module.rules.push(svgLoader);

      return webpackConfig;
    },
  },
  style: {
    sass: {
      loaderOptions: {
        sourceMap: true,
        additionalData: '@import "@styles/utilities";',
      },
    },
  },
};
