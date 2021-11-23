module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  rules: {
    semi: ['off', 'never'],
    'space-before-function-paren': 'off',
    'no-unused-vars': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': ['warn', { semi: false, singleQuote: true }],
    'vue/max-attributes-per-line': 'off',
    'vue/html-closing-bracket-newline': ['off', { multiline: 'never' }],
    'vue/no-use-v-if-with-v-for': ['error', {
      'allowUsingIterationVar': true
    }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  plugins: ['prettier']
}
