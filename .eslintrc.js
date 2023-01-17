module.exports = {
  env: {
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: [ 'react', 'react-hooks', '@typescript-eslint' ],
  rules: {
    '@typescript-eslint/member-ordering': [ 'error' ],
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'array-bracket-spacing': [ 'error', 'always', { 'arraysInArrays': true, 'objectsInArrays': true } ],
    'comma-dangle': [ 'error', 'always-multiline' ],
    'comma-spacing': [ 'error', {
      'after': true,
      'before': false,
    } ],
    'comma-style': [ 'error', 'last' ],
    indent: [ 'error', 2, { SwitchCase: 1 } ],
    'key-spacing': [ 'error', { 'beforeColon': false } ],
    'linebreak-style': [ 'error', 'unix' ],
    'no-empty-function': 'error',
    'no-multi-spaces': 'error',
    'object-curly-spacing': [ 'error', 'always', { 'objectsInObjects': false } ],
    quotes: [ 'error', 'single', { avoidEscape: true } ],
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    semi: [ 'error', 'always' ],
    'semi-spacing': [ 'error', {
      'after': true,
      'before': true,
    } ],
    'sort-imports': [ 'error', {
      'allowSeparatedGroups': true,
      'ignoreCase': false,
      'ignoreDeclarationSort': false,
      'ignoreMemberSort': false,
      'memberSyntaxSortOrder': [ 'none', 'all', 'multiple', 'single' ],
    } ],
    'sort-keys': [ 'error', 'asc', {
      'caseSensitive': true,
      'minKeys': 2,
      'natural': false,
    } ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
} ;
