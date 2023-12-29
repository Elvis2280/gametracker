module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'postcss.config.js',
    'vite.config.ts',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: ['./tsconfig.json', './postcss.config.js', './vite.config.ts'],
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'prettier'],
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': 'error',
  },
};
