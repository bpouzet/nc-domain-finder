/** @type {import('@babel/core').ConfigFunction} */
module.exports = function(api) {
  api.cache(true) ;

  return {
    env: {
      production: {
        plugins: [ 'react-native-paper/babel' ],
      },
    },
    plugins: [
      require.resolve('expo-router/babel'),
      [
        'module-resolver',
        {
          alias: {
            // This needs to be mirrored in tsconfig.json
            '@components': './src/components',
            '@config': './src/config',
            '@customTypes': './src/types',
            '@helpers': './src/helpers',
            '@hooks': './src/hooks',
          },
        },
      ],
    ],
    presets: [ 'babel-preset-expo' ],
  } ;
} ;
