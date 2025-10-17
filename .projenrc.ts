import { awscdk } from 'projen';
import { TrailingComma, Transform } from 'projen/lib/javascript';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'go-to-k',
  authorAddress: '24818752+go-to-k@users.noreply.github.com',
  majorVersion: 1,
  cdkVersion: '2.82.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.0.0',
  name: 'elb-other-5xx-alarm',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/go-to-k/elb-other-5xx-alarm.git',
  description:
    'CloudWatch Alarm for HTTPCode_ELB_5XX_Count excluding 500, 502, 503, and 504 (e.g. 501, 505, 561)',
  prettier: true,
  prettierOptions: {
    settings: {
      singleQuote: true,
      jsxSingleQuote: true,
      trailingComma: TrailingComma.ALL,
      semi: true,
      printWidth: 100,
    },
  },
  eslintOptions: {
    dirs: ['src'],
    prettier: true,
    ignorePatterns: [
      'example/**/*',
      'lambda/**/*',
      'test/assets/**/*',
      'test/*.snapshot/**/*',
      '*.d.ts',
    ],
  },
  jestOptions: {
    configFilePath: 'jest.config.json',
    jestConfig: {
      testEnvironment: 'node',
      roots: ['<rootDir>/test'],
      testMatch: ['**/*.test.ts'],
      transform: {
        '^.+\\.tsx?$': new Transform('ts-jest'),
      },
      snapshotSerializers: ['<rootDir>/test/snapshot-plugin.ts'],
    },
  },
  license: 'MIT',
  keywords: ['aws', 'cdk', 'aws-cdk', 'cloudwatch', 'elb'],
  gitignore: ['*.js', '*.d.ts', 'cdk.out/'],
  githubOptions: {
    pullRequestLintOptions: {
      semanticTitleOptions: {
        types: ['feat', 'fix', 'chore', 'docs', 'test', 'refactor', 'ci'],
      },
    },
  },
  workflowNodeVersion: '24',
  npmTrustedPublishing: true,
  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.setScript('cdk', 'cdk');
project.setScript('integ:deploy', "cdk deploy --app='./test/integ.js'");
project.setScript('integ:destroy', "cdk destroy --app='./test/integ.js'");
project.synth();
