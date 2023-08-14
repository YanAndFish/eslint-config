import { ESLintUtils } from '@typescript-eslint/utils'
import type { TSESTree } from '@typescript-eslint/types'

export type Matcher = string | string[] | RegExp

export const createRule = ESLintUtils.RuleCreator(name => name)

export function isSourceOf(node: TSESTree.ImportDeclaration, matcher: Matcher): boolean {
  const source = node.source.value

  if (matcher instanceof RegExp)
    return matcher.test(source)
  else if (typeof matcher === 'string')
    return source.startsWith(matcher)
  else
    return matcher.some(m => source.startsWith(m))
}
