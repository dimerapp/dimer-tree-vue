<div align="center">
  <div>
    <img width="500" src="https://res.cloudinary.com/adonisjs/image/upload/q_100/v1532274184/Dimer_Readme_Banner_lyy7wv.svg" alt="Dimer App">
  </div>
  <br>
  <p>
    <a href="https://dimerapp.com/what-is-dimer">
      Dimer is an open source project and CMS to help you publish your documentation online.
    </a>
  </p>
  <br>
  <p>
    <sub>We believe every project/product is incomplete without documentation. <br /> We want to help you publish user facing documentation, without worrying <code>about tools or code</code> to write.</sub>
  </p>
  <br>
</div>

# Dimer Tree Vue
> Converts dimer markdown AST node to HTML using Vue

[![travis-image]][travis-url]
[![npm-image]][npm-url]

If you are using Vue to create Dimer theme, then it will be best to use this low level component to convert all markdown AST nodes into HTML.

## Installation

```shell
npm i dimer-tree-vue

# Yarn
yarn add dimer-tree-vue
```

## Usage
After installation, import the module and use it as follows.

```js
import * as dimerTree from 'dimer-tree-vue'
import Vue from 'vue'

Vue.use(dimerTree)

// or with options
Vue.use(dimerTree, {
  processFn: function (node, reRender, createElement) {
    if (node.tag === 'img') {
      return createElement('div', { class: 'image-container' }, reRender(node))
    }
  }
})
```

## Using the component
The plugin will register the component globally and can be used as follows.

```vue
<template>
  <dimer-tree :node="markdownAST" />
</template>
```

## Change log

The change log can be found in the [CHANGELOG.md](https://github.com/dimerapp/dimer-tree-vue/CHANGELOG.md) file.

## Contributing

Everyone is welcome to contribute. Please take a moment to review the [contributing guidelines](CONTRIBUTING.md).

## Authors & License
[thetutlage](https://github.com/thetutlage) and [contributors](https://github.com/dimerapp/dimer-tree-vue/graphs/contributors).

MIT License, see the included [MIT](LICENSE.md) file.

[travis-image]: https://img.shields.io/travis/dimerapp/dimer-tree-vue/master.svg?style=flat-square&logo=travis
[travis-url]: https://travis-ci.org/dimerapp/dimer-tree-vue "travis"

[npm-image]: https://img.shields.io/npm/v/dimer-tree-vue.svg?style=flat-square&logo=npm
[npm-url]: https://npmjs.org/package/dimer-tree-vue "npm"
