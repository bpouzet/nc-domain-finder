import Constants from 'expo-constants'

module.exports = {
  getBundleId: () => Constants.expoConfig?.ios?.bundleIdentifier,
  getVersion: () => Constants.expoConfig?.version,
}
