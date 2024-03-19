/** @type {import('@babel/core').ConfigFunction} */
module.exports = function(api) {
  api.cache(true) ;

  return {
    plugins: [
      [ 'react-native-paper/babel' ],
      [
        'module:react-native-dotenv', {
          'envName': 'APP_ENV',
          'moduleName': '@env',
          'path': '.env',
          'blocklist': null,
          'allowlist': null,
          'safe': false,
          'allowUndefined': true,
          'verbose': false
        },
      ],
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          alias: {
            // This needs to be mirrored in tsconfig.json
            '@components': './src/components',
            '@config': './src/config',
            '@customTypes': './src/types',
            '@helpers': './src/helpers',
            '@hooks': './src/hooks',
            'react-native-device-info': './react-native-device-info.js',
          },
        },
      ],
      [
        'formatjs',
        {
          "idInterpolationPattern": "[sha512:contenthash:base64:6]",
          "ast": true
        }
      ],
    ],
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
  } ;
} ;
