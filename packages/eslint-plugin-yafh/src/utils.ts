import { ESLintUtils } from '@typescript-eslint/utils'

export function createRule(name: string): ReturnType<typeof ESLintUtils.RuleCreator> {
  return ESLintUtils.RuleCreator(() => name)
}
