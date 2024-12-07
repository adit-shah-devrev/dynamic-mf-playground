//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  webpack: (config, options) => {
    config.externals = [...config.externals, 'canvas', 'jsdom'];
    config.plugins.push(
      new NextFederationPlugin({
        name: 'remote1',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './product-recommendations':
            './components/product-recommendations.tsx',
        },
        extraOptions: {},
        remotes: {},
        shared: {},
      })
    );

    return config;
  },
};

module.exports = withNx(nextConfig);
