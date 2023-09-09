import { RuleTester } from '@typescript-eslint/rule-tester'
import rule, { name } from '../rules/pascal-case-component-name'

// should pass
const valids = ['src/Foo.vue', 'src/FooIndex.vue', 'src/index.ts']
// should fail
const invalids = [
  'src/foo.vue',
  'foo-bar.vue',
  'foo_bar.vue',
  '[id].vue',
  '_index.vue',
]

const ruleTester: RuleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
})

ruleTester.run(name, rule as any, {
  valid: valids.map(e => ({
    code: '',
    filename: e,
    options: ['vue'],
  })),
  invalid: invalids.map(e => ({
    code: '',
    filename: e,
    errors: [{ messageId: 'missingPascalCaseComponentName' }],
    options: [['tsx', 'vue']] as any,
  })),
})
