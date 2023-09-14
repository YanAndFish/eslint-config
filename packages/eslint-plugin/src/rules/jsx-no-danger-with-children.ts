import type { TSESTree } from '@typescript-eslint/types'
import { createRule } from '../utils/common'
import { findJsxProp, findObjectProp, isJsxEmptyExpression, isLineBreak, variablesInScope } from '../utils/jsx'

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
  defaultOptions: [{ propsName: ['innerHTML', 'dangerouslySetInnerHTML'], rendererName: ['createElement', 'createComponent'] }],
  create: (context, options) => {
    const propName = Array.isArray(options[0].propsName) ? options[0].propsName! : [options[0].propsName!]
    const rendererName = Array.isArray(options[0].rendererName) ? options[0].rendererName! : [options[0].rendererName!]

    return {
      JSXElement(node) {
        let hasChildren = false

        if (node.children.length && !node.children.every(e => isLineBreak(e) || isJsxEmptyExpression(e)))
          hasChildren = true
        else if (findJsxProp(context, node, 'children'))
          hasChildren = true

        if (
          node.openingElement.attributes
          && hasChildren
          && findJsxProp(context, node, propName)
        ) {
          context.report({
            node,
            messageId: 'jsxNoDangerWithChildren',
            data: {
              props: propName.map(e => `props.${e}`).join(' or '),
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

          let props: any = node.arguments[1]

          if (props.type === 'Identifier') {
            const variable = variablesInScope(context).find(item => item.name === (props as TSESTree.Identifier).name)
            if (variable && variable.defs.length && (variable.defs[0].node as any).init)
              props = (variable.defs[0].node as any).init
          }

          const dangerously = findObjectProp(context, props, propName, [])

          if (node.arguments.length === 2) {
            if (findObjectProp(context, props, 'children', []))
              hasChildren = true
          } else {
            hasChildren = true
          }

          if (dangerously && hasChildren) {
            context.report({
              node,
              messageId: 'jsxNoDangerWithChildren',
              data: {
                props: propName.map(e => `props.${e}`).join(' or '),
              },
            })
          }
        }
      },
    }
  },
})
