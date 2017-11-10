module.exports = {
  extends: ['standard'],
  plugins: ['react'],
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
  	'space-before-function-paren': ['error', 'never'],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
  	'operator-linebreak': 'off'
  }
}
