module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    'class-methods-use-this': 0,
    'consistent-return': 0,
    'no-param-reassign': 0,
    'object-curly-newline': 0,
    camelcase: 0,
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
  },
};
