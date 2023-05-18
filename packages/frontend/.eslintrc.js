module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "es2021": true,
    "jest": true
  },
  "extends": [
    "plugin:react/recommended",
    "standard-with-typescript",
    "eslint:recommended",
    "plugin:prettier/recommended"
  ],
  "overrides": [],
  "parserOptions": {
    "ecmaVersion": "latest",
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  "plugins": ["react"],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/explicit-function-return-type": "off"
  },
  "ignorePatterns": ["vite-env.d.ts"]
}
