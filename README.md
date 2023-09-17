# @yafh/eslint-config

The configuration of this repository is based on [@antfu/eslint-config](https://github.com/antfu/eslint-config)

### change in this config

- `no-console` set to warn in editor, and allow `console.warn` and `console.error`
- `brace-style` set to `1tbs`

## Usage

### Install

```bash
pnpm add -D eslint @yafh/eslint-config
```

### Config `.eslintrc`

```json
{
  "extends": "@yafh"
}
```

> You don't need `.eslintignore` normally as it has been provided by the preset.

### Add script for package.json

For example:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```