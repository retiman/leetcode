module.exports = {
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    // Disables rules that are handled by prettier already.
    //
    // See https://github.com/prettier/eslint-config-prettier
    'prettier',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['jest'],
  rules: {
    // Enabled because one should not assign the result of a void function.
    //
    // See https://typescript-eslint.io/rules/no-confusing-void-expression/
    '@typescript-eslint/no-confusing-void-expression': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        vars: 'all',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-use-before-define': 'off',
    // Disabled because there's no reason to enable this except to be pedantic.  Code organization desires may dictate
    // that methods not using this should still be methods.  For example, there are situations where it's desirable to
    // define only instance methods for ease of use, or you would prefer that the caller not have to know or care that
    // a method actually uses instance variables or not.
    //
    // In other situations, nothing is stopping you from declaring a function outside of a class, which is functionally
    // the same as a static method.
    //
    // See https://eslint.org/docs/latest/rules/class-methods-use-this
    'class-methods-use-this': 'off',
    // Disabled because this rule cannot detect if a dependency is only for development.  For example, if you have a
    // postbuild.js and you include it in tsconfig.json, then this plugin will incorrectly assume that any packages
    // required there should be in dependencies.
    //
    // In that situation, postbuild.js is included in tsconfig.json so that JavaScript files (even ones not included
    // in the final build) should be linted according to @typescript-eslint.
    //
    // See https://stackoverflow.com/questions/61956555/why-is-typescript-eslint-parser-including-files-outside-of-those-configured-in
    // See https://www.typescriptlang.org/tsconfig#include
    'import/no-extraneous-dependencies': 'off',
    // Disabled because named exports are more explicit.
    //
    // See https://github.com/airbnb/javascript/issues/1365
    // See https://blog.neufund.org/why-we-have-banned-default-exports-and-you-should-do-the-same-d51fdc2cf2ad
    'import/prefer-default-export': 'off',
    // Disabled because continue ESLint specifically is concerned about continue being used with labels.  Using this
    // with labels is akin to a goto statement, which makes code hard to reason about.  Proper use of the continue
    // statement makes code easier to read.
    //
    // The ESLint recommendations around avoiding continue involve using if statements, which do actively degrade code
    // readability.  ESLint, for whatever reason, recommends this even when labels are not required.  Good readability,
    // in contrast, would call for using continue statements with guard clauses.
    //
    // See https://eslint.org/docs/latest/rules/no-continue
    // See https://refactoring.com/catalog/replaceNestedConditionalWithGuardClauses.html
    'no-continue': 'off',
    // Disabled because this is convenient in for loops.  Generally it is disabled because automatic semicolon insertion
    // can inadvertently change semantics.
    //
    // TODO: Investigate if this is still problematic if prettier inserts semicolons after linting.
    //
    // See https://eslint.org/docs/latest/rules/no-plusplus
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    // Disabled because we do want to have underscore prefixed identifiers to indicate a variable is ignored.
    //
    // See https://eslint.org/docs/latest/rules/no-underscore-dangle
    'no-underscore-dangle': 'off',
  },
  ignorePatterns: ['build', 'coverage', 'dist', 'node_modules'],
};
