// Learn more https://docs.expo.dev/guides/monorepos
// Learn more https://docs.expo.io/guides/customizing-metro
/**
 * @type {import('expo/metro-config')}
 */
//const { getDefaultConfig } = require('expo/metro-config')

// This replaces `const { getDefaultConfig } = require('expo/metro-config')`
const { getSentryExpoConfig } = require('@sentry/react-native/metro')

const path = require('path')

// Find the project and workspace directories
const projectRoot = __dirname

module.exports = (() => {
  //const config = getDefaultConfig(projectRoot)

  // This replaces `const config = getDefaultConfig(__dirname)`
  const config = getSentryExpoConfig(projectRoot)

  const { transformer, resolver } = config

  config.transformer = {
    ...transformer,
    unstable_allowRequireContext: true,
    minifierPath: require.resolve('metro-minify-terser'),
  }
  config.resolver = {
    ...resolver,
    // Let Metro know where to resolve packages and in what order
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
    ],
    // Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
    //disableHierarchicalLookup: true,
    sourceExts: [
      ...resolver.sourceExts,
      "mjs"
    ]
  }

  config.resetCache = true

  return config
})()
