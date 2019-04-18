module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    CONFIG: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-var': 1,
    'object-curly-spacing': ['warn', 'always'],
    camelcase: 0,
    'prefer-const': 1,
    'space-before-function-paren': 0,
    'prefer-promise-reject-errors': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
