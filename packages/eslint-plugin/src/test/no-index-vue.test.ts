import { RuleTester } from '@typescript-eslint/rule-tester'
import rule, { name } from '../rules/no-index-vue'

// should pass
const valids = ['src/foo.vue', 'src/fooIndex.vue', 'src/index.ts']
// should fail
const invalids = [
  'src/index.vue',
  'index.vue',
  'src/Index.vue',
  'src/Index.vue',
]

const ruleTester: RuleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
})

ruleTester.run(name, rule as any, {
  valid: valids.map(e => ({
    code: '',
    filename: e,
  })),
  invalid: invalids.map(e => ({
    code: '',
    filename: e,
    errors: [{ messageId: 'noIndexVue' }],
  })),
})
