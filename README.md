# buonapp

buonapp is an all-in-one application featuring a calendar, todos, recipes, weather, and news. It's designed to be easy to use and convenient for managing various aspects of your daily life.

This template should help get you started developing with Vue 3 in Vite using bun as the package manager.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Storybook

buonapp includes Storybook for developing UI components in isolation. You can use it to build and test components independently of the main application.

### Storybook Commands

```sh
bun storybook
```

Launches Storybook in development mode.

```sh
bun build-storybook
```

Builds Storybook for production.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
bun install
```

### Compile and Hot-Reload for Development

```sh
bun dev
```

### Type-Check, Compile and Minify for Production

```sh
bun build
```

### Lint with [ESLint](https://eslint.org/)

```sh
bun lint
```
