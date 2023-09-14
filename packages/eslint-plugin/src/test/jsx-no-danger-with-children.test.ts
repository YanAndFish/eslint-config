import { RuleTester } from '@typescript-eslint/rule-tester'
import rule, { name } from '../rules/jsx-no-danger-with-children'

// should pass
const valids = [
  `<div foo="">
  <div></div>
 </div>`,
  '<div innerHTML=""></div>',
  `<div innerHTML="">
    

  </div>`,
  `<div innerHTML="">
    {/* */}
  </div>`,
  '<div innerHTML="">{/* */}</div>',
]

// should fail
const invalids = [
  '<div innerHTML=""><div></div></div>',
  `<div innerHTML="">
    <div></div>
  </div>`,
  '<div innerHTML="" children={<div></div>}></div>',
]

const ruleTester: RuleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
})

ruleTester.run(name, rule as any, {
  valid: valids,
  invalid: invalids.map(i => ({
    code: i,
    errors: [{ messageId: 'jsxNoDangerWithChildren' }],
  })),
})
