import { App, Duration, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { SnsAction } from 'aws-cdk-lib/aws-cloudwatch-actions';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { ELBOther5XXAlarm } from '../src';

const ALARM_NAME = 'test-alarm';

const getTemplate = (): Template => {
  const app = new App();
  const stack = new Stack(app, 'TestStack');

  const topic = new Topic(stack, 'Topic', {});
  const alarmActions = [new SnsAction(topic)];

  new ELBOther5XXAlarm(stack, 'ELBOther5XXAlarm', {
    loadBalancerFullName: 'default',
    alarmName: ALARM_NAME,
    alarmActions: alarmActions,
    period: Duration.seconds(60),
    threshold: 1,
    evaluationPeriods: 1,
  });
  const template = Template.fromStack(stack);

  return template;
};

describe('Fine-grained Assertions Tests', () => {
  const template = getTemplate();

  test('Alarm created', () => {
    template.resourceCountIs('AWS::CloudWatch::Alarm', 5);
  });

  test('CompositeAlarm created', () => {
    template.resourceCountIs('AWS::CloudWatch::CompositeAlarm', 2);
  });

  test('CompositeAlarm created', () => {
    template.hasResourceProperties('AWS::CloudWatch::CompositeAlarm', {
      AlarmName: ALARM_NAME,
      ActionsEnabled: true,
    });
  });
});
