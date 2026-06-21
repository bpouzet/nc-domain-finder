// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*', 'node_modules/*', 'android/*', 'ios/*', '.expo/*', '*.config.js'],
  },
  {
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/member-ordering': ['error'],
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',

      // Array and object formatting
      'array-bracket-spacing': ['error', 'always', {
        'arraysInArrays': true,
        'objectsInArrays': true
      }],
      'object-curly-spacing': ['error', 'always', {
        'objectsInObjects': false
      }],

      // Comma rules
      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': ['error', {
        'after': true,
        'before': false,
      }],
      'comma-style': ['error', 'last'],

      // Indentation and spacing
      'key-spacing': ['error', { 'beforeColon': false }],
      'no-multi-spaces': 'error',

      // Line endings
      'linebreak-style': ['error', 'unix'],

      // Functions
      'no-empty-function': 'error',

      // Quotes
      'quotes': ['error', 'single', { avoidEscape: true }],

      // Semicolons
      'semi': ['error', 'always'],
      'semi-spacing': ['error', {
        'after': true,
        'before': true,
      }],

      // Sorting
      'sort-imports': ['error', {
        'allowSeparatedGroups': true,
        'ignoreCase': false,
        'ignoreDeclarationSort': false,
        'ignoreMemberSort': false,
        'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single'],
      }],
      'sort-keys': ['error', 'asc', {
        'caseSensitive': true,
        'minKeys': 2,
        'natural': false,
      }],

      // React rules
      'react/display-name': 'off',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',

      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      //'react-hooks/exhaustive-deps': 'warn',
      // React Compiler linting: the standalone eslint-plugin-react-compiler rule was removed in
      // SDK 56. Its checks now live as granular react-hooks/* rules (via the plugin's
      // 'recommended-latest' config). React Compiler optimization itself still runs via babel-preset-expo.
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]);
