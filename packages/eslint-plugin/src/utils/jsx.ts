import type { TSESTree } from '@typescript-eslint/types'
import type { RuleContext, Scope } from '@typescript-eslint/utils/ts-eslint'

export function isWhiteSpaces(value: unknown): boolean {
  return typeof value === 'string' ? /^\s*$/.test(value) : false
}

export function findJsxProp<M extends string, O extends readonly unknown[]>(context: RuleContext<M, O>, node: TSESTree.JSXElement, propName: string | string[]): TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute {
  const attributes: any[] = node.openingElement.attributes
  return attributes.find((attribute) => {
    if (attribute.type === 'JSXSpreadAttribute') {
      const variable = findSpreadVariable(context, (attribute.argument as any).name)
      if (variable && variable.defs.length && (variable.defs[0].node as any).init)
        return findObjectProp(context, (variable.defs[0].node as any).init, propName, [])
    }
    return attribute.name && propName.includes(attribute.name.name)
  })
}

export function isLineBreak(node: TSESTree.Node): boolean {
  const isLiteral = node.type === 'Literal' || node.type === 'JSXText'
  const isMultiline = node.loc.start.line !== node.loc.end.line
  const _isWhiteSpaces = isWhiteSpaces((node as any).value)

  return isLiteral && isMultiline && _isWhiteSpaces
}

export function isJsxEmptyExpression(node: TSESTree.Node): boolean {
  if (node.type === 'JSXEmptyExpression')
    return true
  else if (node.type === 'JSXExpressionContainer' && node.expression.type === 'JSXEmptyExpression')
    return true

  return false
}

export function findObjectProp<M extends string, O extends readonly unknown[]>(context: RuleContext<M, O>, node: TSESTree.ObjectExpression, propName: string | string[], seenProps: string[]): TSESTree.ObjectLiteralElement | undefined {
  if (!node?.properties)
    return

  const _propName = Array.isArray(propName) ? propName : [propName]

  return node.properties.find((prop: any) => {
    if (prop.type === 'Property')
      return _propName.includes((prop.key as any).name)

    if (prop.type === 'ExperimentalSpreadProperty' || prop.type === 'SpreadElement') {
      const variable = findSpreadVariable(context, prop.argument.name)
      if (variable && variable.defs.length && (variable.defs[0].node as any).init) {
        if (seenProps.includes(prop.argument.name))
          return false

        const newSeenProps = seenProps.concat(prop.argument.name || [])
        return findObjectProp(context, (variable.defs[0].node as any).init, propName, newSeenProps)
      }
    }
    return false
  })
}

export function variablesInScope<M extends string, O extends readonly unknown[]>(context: RuleContext<M, O>): Scope.Variable[] {
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
