/**
 * Process a given dimer node at a time
 *
 * @method processNode
 *
 * @param  {Object}    node
 * @param  {Function}  processFn
 *
 * @return {Mixed}
 */
function processNode (node, createElement, processFn) {
  /**
   * Ignore dimertitle and dimerTitle
   */
  if (['dimertitle', 'dimerTitle'].indexOf(node.tag) > -1) {
    return
  }

  /**
   * Return raw value
   */
  if (node.type === 'text') {
    return node.value
  }

  /**
   * Normalize class name
   */
  if (node.props && node.props.className) {
    node.props.class = node.props.className
    delete node.props.className
  }

  /**
   * Invoke processFn to see if they want to render custom elements
   * or components
   */
  const output = processFn(node, (child) => processNode(child, createElement, processFn), createElement)

  /**
   * If they return explicit false, then skip the node
   */
  if (output === false) {
    return
  }

  /**
   * If they return nothing, then we will render the node ourselves
   */
  if (!output) {
    return createElement(node.tag, { attrs: node.props }, node.children.map((child) => {
      return processNode(child, createElement, processFn)
    }))
  }

  /**
   * Return output
   */
  return output
}

module.exports = {
  install (Vue, options) {
    options = Object.assign({ processFn: function () {} }, options)

    Vue.component('DimerTree', {
      data: function () {
        return { processFn: options.processFn }
      },

      props: {
        node: {
          validator (node) {
            return node && Array.isArray(node.children)
          }
        }
      },

      render (createElement) {
        return processNode({
          tag: 'div',
          props: { className: 'root' },
          children: this.node.children
        }, createElement, this.processFn)
      }
    })
  }
}
