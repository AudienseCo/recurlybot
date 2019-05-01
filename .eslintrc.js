module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    specHelper: 'readonly',
    describe: 'readonly',
    it: 'readonly',
    context: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'comma-dangle': 0,
    'eslint no-use-before-define': 0,
    'import/no-dynamic-require': 0,
    'no-use-before-define': 0,
    'consistent-return': 0
  }
};