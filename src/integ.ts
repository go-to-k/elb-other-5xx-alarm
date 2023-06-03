import { App, Duration, Stack } from 'aws-cdk-lib';
import { SnsAction } from 'aws-cdk-lib/aws-cloudwatch-actions';
import { SecurityGroup, SubnetType, Vpc } from 'aws-cdk-lib/aws-ec2';
import { ApplicationLoadBalancer, ListenerAction } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { ELBOther5XXAlarm } from '.';

const app = new App();
const stack = new Stack(app, 'ELBOther5XXAlarmStack');

const vpc = new Vpc(stack, 'VPC', {
  natGateways: 0,
  maxAzs: 2,
  subnetConfiguration: [
    {
      cidrMask: 28,
      name: 'public',
      subnetType: SubnetType.PUBLIC,
    },
  ],
});

const albSecurityGroup = new SecurityGroup(stack, 'ALBSecurityGroup', {
  allowAllOutbound: true,
  securityGroupName: 'alb-sg',
  vpc,
});

const alb501 = new ApplicationLoadBalancer(stack, 'ALB501', {
  internetFacing: true,
  loadBalancerName: 'alb501',
  securityGroup: albSecurityGroup,
  vpc,
  vpcSubnets: { subnets: vpc.publicSubnets },
});

alb501.addListener('Listener501', {
  defaultAction: ListenerAction.fixedResponse(501, {
    contentType: 'application/json',
  }),
  open: true,
  port: 80,
});

const alb503 = new ApplicationLoadBalancer(stack, 'ALB503', {
  internetFacing: true,
  loadBalancerName: 'alb503',
  securityGroup: albSecurityGroup,
  vpc,
  vpcSubnets: { subnets: vpc.publicSubnets },
});

alb503.addListener('Listener503', {
  defaultAction: ListenerAction.fixedResponse(503, {
    contentType: 'application/json',
  }),
  open: true,
  port: 80,
});

const topic = new Topic(stack, 'Topic', {});
const alarmActions = [new SnsAction(topic)];

new ELBOther5XXAlarm(stack, 'ELBOther5XXAlarmFor501', {
  loadBalancerFullName: alb501.loadBalancerFullName,
  alarmName: 'my-alarm-501',
  alarmActions: alarmActions,
  period: Duration.seconds(60),
  threshold: 1,
  evaluationPeriods: 1,
});

new ELBOther5XXAlarm(stack, 'ELBOther5XXAlarmFor503', {
  loadBalancerFullName: alb503.loadBalancerFullName,
  alarmName: 'my-alarm-503',
  alarmActions: alarmActions,
  period: Duration.seconds(60),
  threshold: 1,
  evaluationPeriods: 1,
});
