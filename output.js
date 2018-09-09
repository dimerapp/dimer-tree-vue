'use strict';

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
function processNode(node, createElement, processFn) {
  /**
   * Ignore dimertitle and dimerTitle
   */
  if (['dimertitle', 'dimerTitle'].indexOf(node.tag) > -1) {
    return;
  }

  /**
   * Return raw value
   */
  if (node.type === 'text') {
    return node.value;
  }

  /**
   * Invoke processFn to see if they want to render custom elements
   * or components
   */
  var output = processFn(node, function (child) {
    return processNode(child, createElement, processFn);
  }, createElement);

  /**
   * If they return explicit false, then skip the node
   */
  if (output === false) {
    return;
  }

  /**
   * If they return nothing, then we will render the node ourselves
   */
  if (!output) {
    var attrs = Object.keys(node.props).reduce(function (result, key) {
      if (key === 'className') {
        result.class = node.props.className.join(' ');
      } else {
        result[key] = node.props[key];
      }
      return result;
    }, {});

    return createElement(node.tag, { attrs: attrs }, node.children.map(function (child) {
      return processNode(child, createElement, processFn);
    }));
  }

  /**
   * Return output
   */
  return output;
}

module.exports = {
  install: function install(Vue, options) {
    options = options || {};
    options.processFn = options.processFn || function () {};

    Vue.component('DimerTree', {
      data: function data() {
        return { processFn: options.processFn };
      },

      props: {
        node: {
          validator: function validator(node) {
            return node && Array.isArray(node.children);
          }
        }
      },

      render: function render(createElement) {
        return processNode({
          tag: 'div',
          props: { className: ['root'] },
          children: this.node.children
        }, createElement, this.processFn);
      }
    });
  }
};
