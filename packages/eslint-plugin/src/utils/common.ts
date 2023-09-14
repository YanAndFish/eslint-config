import { ESLintUtils } from '@typescript-eslint/utils'
import { AST_NODE_TYPES, type TSESTree } from '@typescript-eslint/types'

export type Matcher = string | string[]

export const createRule = ESLintUtils.RuleCreator(name => name)

function normalizeSource(source: string): string {
  return source.toLowerCase().trim()
}

export function isStrictSourceOf(node: TSESTree.ImportDeclaration, matcher: Matcher): boolean {
  const source = normalizeSource(node.source.value)

  if (typeof matcher === 'string')
    return source === matcher
  else
    return matcher.some(m => source.startsWith(normalizeSource(m)))
}

export function isSourceOf(node: TSESTree.ImportDeclaration, matcher: Matcher): boolean {
  const source = normalizeSource(node.source.value)

  if (typeof matcher === 'string')
    return source.startsWith(normalizeSource(matcher))
  else
    return matcher.some(m => source.startsWith(normalizeSource(m)))
}

export function isSourceOfRegExp(node: TSESTree.ImportDeclaration, matcher: RegExp): boolean {
  const source = node.source.value
  return matcher.test(source)
}

export function isAliasImportSpecifier(node: TSESTree.ImportClause): boolean {
  return node.type === AST_NODE_TYPES.ImportSpecifier && (node.imported.range[0] !== node.local.range[0] || node.imported.range[1] !== node.local.range[1])
}
