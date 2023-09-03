# ELB Other 5XX Alarm

## What is

AWS CDK construct library for a CloudWatch Alarm for Elastic Load Balancing that fires on **HTTPCode_ELB_5XX_Count excluding 500, 502, 503, and 504** (e.g. 501, 505, 561).

Metrics for concrete status codes such as 500 are provided (e.g. HTTPCode_ELB_500_Count). Therefore, it is useful to distinguish detection from them.

For more information, please see the following blog page. [here](https://dev.to/aws-builders/cloudwatch-composite-alarm-to-detect-elbs-other-5xx-with-aws-cdk-45pn).

### CloudWatch Composite Alarm

The "ELB Other 5XX Alarm" by this construct uses the [CloudWatch Composite Alarm](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Create_Composite_Alarm.html).

The alarm rule for this composite alarm is as follows.

```text
ALARM(HTTPCode_ELB_5XX_Count)
AND (
    NOT (
        ALARM(HTTPCode_ELB_500_Count)
        OR ALARM(HTTPCode_ELB_502_Count)
        OR ALARM(HTTPCode_ELB_503_Count)
        OR ALARM(HTTPCode_ELB_504_Count)
    )
)
```

This is actually implemented using **a suppressor alarm**.

## Usage

```
npm install elb-other-5xx-alarm
```

```ts
import { ELBOther5XXAlarm } from 'elb-other-5xx-alarm';

new ELBOther5XXAlarm(this, 'ELBOther5XXAlarm', {
  alarmName: 'my-alarm',
  alarmActions: alarmActions, // e.g. [new SnsAction(new Topic(this, 'Topic', {}))]
  loadBalancerFullName: alb.loadBalancerFullName, // e.g. 'app/alb/123456789'
  period: Duration.seconds(60),
  threshold: 1,
  evaluationPeriods: 1,
});
```
