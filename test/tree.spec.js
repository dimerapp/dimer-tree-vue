/*
* tree-react
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const test = require('japa')
const tree = require('..')
const utils = require('@vue/server-test-utils')
const Markdown = require('@dimerapp/markdown')
const dedent = require('dedent')
const Vue = require('vue')

function freshInstance (options) {
  const Component = Vue.extend()
  Component.use(tree, options)
  return Component.component('DimerTree')
}

test.group('Tree', (group) => {
  test('process dimer content node to html', async (assert) => {
    const template = 'Hello world'
    const json = await (new Markdown(template)).toJSON()

    const output = utils.render(freshInstance(), {
      propsData: {
        node: json.contents
      }
    })

    assert.equal(output.text(), 'Hello world')
  })

  test('process dimer content node with ul', async (assert) => {
    const template = dedent`
    - This is li
    `

    const json = await (new Markdown(template)).toJSON()

    const output = utils.render(freshInstance(), {
      propsData: {
        node: json.contents
      }
    })

    assert.equal(output.find('ul li').length, 1)
    assert.equal(output.find('ul li').text(), 'This is li')
  })

  test('process dimer content node with custom output', async (assert) => {
    const template = dedent`
    - This is li
    `

    const json = await (new Markdown(template)).toJSON()

    const output = utils.render(freshInstance({
      processFn: function (node, render, createElement) {
        if (node.tag === 'li') {
          return createElement('li', Object.assign(node.props, { class: 'foo' }), node.children.map(render))
        }
      }
    }), {
      propsData: {
        node: json.contents
      }
    })

    assert.equal(output.find('ul li.foo').length, 1)
    assert.equal(output.find('ul li.foo').text(), 'This is li')
  })

  test('assing id to element', async (assert) => {
    const template = dedent`
    # Hello
    `

    const json = await (new Markdown(template, {
      skipToc: true
    })).toJSON()

    const output = utils.render(freshInstance(), {
      propsData: {
        node: json.contents
      }
    })

    assert.equal(output.find('#hello').text(), 'Hello')
  })

  test('assing classes to the element', async (assert) => {
    const template = dedent`
    [note]
    hello
    [/note]
    `

    const json = await (new Markdown(template, {
      skipToc: true
    })).toJSON()

    const output = utils.render(freshInstance(), {
      propsData: {
        node: json.contents
      }
    })

    assert.equal(output.find('.alert').text(), 'hello')
  })
})
