import { createRule } from '../utils/common'
import { findJsxProp, findObjectProp, isLineBreak, variablesInScope } from '../utils/jsx'

type Options = [{
  propsName?: string | string[]
  rendererName?: string | string[]
}]
type MessageIds = 'jsxNoDangerWithChildren'
export const name = 'jsx-no-danger-with-children'

export default createRule<Options, MessageIds>({
  name,
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow when a DOM element is using both children and innerHtml',
      recommended: 'recommended',
    },
    schema: [
      {
        type: ['array', 'string'],
        description: '`innerHTML` prop name',
      },
    ],
    messages: {
      jsxNoDangerWithChildren: 'Only set one of `children` or {{props}}',
    },
  },
  defaultOptions: [{ propsName: ['innerHTML'], rendererName: ['createElement', 'createComponent'] }],
  create: (context, options) => {
    const propName = Array.isArray(options[0].propsName) ? options[0].propsName! : [options[0].propsName!]
    const rendererName = Array.isArray(options[0].rendererName) ? options[0].rendererName! : [options[0].rendererName!]

    return {
      JSXElement(node) {
        let hasChildren = false

        if (node.children.length && !isLineBreak(node.children[0]))
          hasChildren = true
        else if (findJsxProp(node, 'children'))
          hasChildren = true

        if (
          node.openingElement.attributes
          && hasChildren
          && findJsxProp(node, 'dangerouslySetInnerHTML')
        ) {
          context.report({
            node,
            messageId: 'jsxNoDangerWithChildren',
            data: {
              // TODO
              props: options[0],
            },
          })
        }
      },
      CallExpression(node) {
        if (
          node.callee
          && node.callee.type === 'MemberExpression'
          && !node.callee.computed
          && rendererName.includes(node.callee.property.name)
          && node.arguments.length > 1
        ) {
          let hasChildren = false

          let props = node.arguments[1]

          if (props.type === 'Identifier') {
            const variable = variablesInScope(context).find(item => item.name === props.name)
            if (variable && variable.defs.length && variable.defs[0].node.init)
              props = variable.defs[0].node.init
          }

          const dangerously = findObjectProp(props, 'dangerouslySetInnerHTML', [])

          if (node.arguments.length === 2) {
            if (findObjectProp(props, 'children', []))
              hasChildren = true
          } else {
            hasChildren = true
          }

          if (dangerously && hasChildren) {
            context.report({
              node,
              messageId: 'jsxNoDangerWithChildren',
              data: {
              // TODO
                props: options[0],
              },
            })
          }
        }
      },
    }
  },
})
