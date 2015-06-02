/**
 * @fileoverview Restrict usage of props defined in config
 * @author Jaakko Lukkari
 */
'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = function(context) {
  var MESSAGE = 'Usage of {{propName}} is restricted';

  var configuration = context.options[0] || {};
  var restrictedProps = configuration.props || [];

  return {
    JSXOpeningElement: function(node) {
      var attribute,
          i = 0,
          length = node.attributes.length,
          name;

      for (; i < length; i++) {
        attribute = node.attributes[i];
        name = attribute.name.name;
        if (restrictedProps.indexOf(name) > -1) {
          context.report(attribute, MESSAGE, {propName: name});
        }
      }
    }
  };
};
