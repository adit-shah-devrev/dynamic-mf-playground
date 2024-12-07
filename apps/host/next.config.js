//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

const remotes = (isServer) => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    remote1: `remote1@http://localhost:3001/_next/static/${location}/remoteEntry.js`,
    remote2: `remote2@http://localhost:3002/_next/static/${location}/remoteEntry.js`,
  };
};

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
        name: 'host',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {},
        extraOptions: {},
        remotes: remotes(options.isServer),
        shared: {},
      })
    );

    return config;
  },
};

module.exports = withNx(nextConfig);
