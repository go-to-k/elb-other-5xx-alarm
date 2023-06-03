import { awscdk } from 'projen';
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
  license: 'MIT',
  keywords: ['aws', 'cdk', 'aws-cdk', 'cloudwatch', 'elb'],
  eslintOptions: {
    dirs: ['src'],
  },
  gitignore: ['*.js', '*.d.ts', 'cdk.out/'],
  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();
