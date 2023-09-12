import type { TSESTree } from '@typescript-eslint/types'
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint'

export function isWhiteSpaces(value: unknown) {
  return typeof value === 'string' ? /^\s*$/.test(value) : false
}

export function findJsxProp(node: TSESTree.JSXElement, propName: string | string[]) {
  const attributes = node.openingElement.attributes
  return attributes.find((attribute) => {
    if (attribute.type === 'JSXSpreadAttribute') {
      const variable = findSpreadVariable(attribute.argument.name)
      if (variable && variable.defs.length && variable.defs[0].node.init)
        return findObjectProp(variable.defs[0].node.init, propName, [])
    }
    return attribute.name && propName.includes(attribute.name.name)
  })
}

export function isLineBreak(node: TSESTree.Node) {
  const isLiteral = node.type === 'Literal' || node.type === 'JSXText'
  const isMultiline = node.loc.start.line !== node.loc.end.line
  const _isWhiteSpaces = isWhiteSpaces(node.value)

  return isLiteral && isMultiline && _isWhiteSpaces
}

export function findObjectProp(node: TSESTree.ObjectExpression, propName: string | string[], seenProps: string[]) {
  if (!node.properties)
    return false

  return node.properties.find((prop) => {
    if (prop.type === 'Property')
      return prop.key.name === propName

    if (prop.type === 'ExperimentalSpreadProperty' || prop.type === 'SpreadElement') {
      const variable = findSpreadVariable(prop.argument.name)
      if (variable && variable.defs.length && variable.defs[0].node.init) {
        if (seenProps.includes(prop.argument.name))
          return false

        const newSeenProps = seenProps.concat(prop.argument.name || [])
        return findObjectProp(variable.defs[0].node.init, propName, newSeenProps)
      }
    }
    return false
  })
}

export function variablesInScope<M extends string, O extends readonly unknown[]>(context: RuleContext<M, O>) {
  let scope = context.getScope()
  let variables = scope.variables

  while (scope.type !== 'global') {
    scope = scope.upper
    variables = scope.variables.concat(variables)
  }
  if (scope.childScopes.length) {
    variables = scope.childScopes[0].variables.concat(variables)
    if (scope.childScopes[0].childScopes.length)
      variables = scope.childScopes[0].childScopes[0].variables.concat(variables)
  }
  variables.reverse()

  return variables
}

export function findSpreadVariable<M extends string, O extends readonly unknown[]>(context: RuleContext<M, O>, name: string) {
  return variablesInScope(context).find(item => item.name === name)
}
