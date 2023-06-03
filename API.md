# ELB Other 5XX Alarm

## What is

This construct creates an alarm for Elastic Load Balancing (as Application Load Balancer) that fires at **HTTPCode_ELB_5XX_Count excluding 500, 502, 503, and 504** (such as 501, 505, 561).

Metrics for concrete status codes such as 500 are provided (e.g. HTTPCode_ELB_500_Count). Therefore, it is useful to distinguish detection from them.

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
# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### ELBOther5XXAlarm <a name="ELBOther5XXAlarm" id="elb-other-5xx-alarm.ELBOther5XXAlarm"></a>

#### Initializers <a name="Initializers" id="elb-other-5xx-alarm.ELBOther5XXAlarm.Initializer"></a>

```typescript
import { ELBOther5XXAlarm } from 'elb-other-5xx-alarm'

new ELBOther5XXAlarm(scope: Construct, id: string, props: ELBOther5XXAlarmProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#elb-other-5xx-alarm.ELBOther5XXAlarm.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#elb-other-5xx-alarm.ELBOther5XXAlarm.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#elb-other-5xx-alarm.ELBOther5XXAlarm.Initializer.parameter.props">props</a></code> | <code><a href="#elb-other-5xx-alarm.ELBOther5XXAlarmProps">ELBOther5XXAlarmProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="elb-other-5xx-alarm.ELBOther5XXAlarm.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="elb-other-5xx-alarm.ELBOther5XXAlarm.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="elb-other-5xx-alarm.ELBOther5XXAlarm.Initializer.parameter.props"></a>

- *Type:* <a href="#elb-other-5xx-alarm.ELBOther5XXAlarmProps">ELBOther5XXAlarmProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#elb-other-5xx-alarm.ELBOther5XXAlarm.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="elb-other-5xx-alarm.ELBOther5XXAlarm.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#elb-other-5xx-alarm.ELBOther5XXAlarm.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="elb-other-5xx-alarm.ELBOther5XXAlarm.isConstruct"></a>

```typescript
import { ELBOther5XXAlarm } from 'elb-other-5xx-alarm'

ELBOther5XXAlarm.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="elb-other-5xx-alarm.ELBOther5XXAlarm.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#elb-other-5xx-alarm.ELBOther5XXAlarm.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#elb-other-5xx-alarm.ELBOther5XXAlarm.property.elbOther5XXAlarm">elbOther5XXAlarm</a></code> | <code>aws-cdk-lib.aws_cloudwatch.CompositeAlarm</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="elb-other-5xx-alarm.ELBOther5XXAlarm.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `elbOther5XXAlarm`<sup>Required</sup> <a name="elbOther5XXAlarm" id="elb-other-5xx-alarm.ELBOther5XXAlarm.property.elbOther5XXAlarm"></a>

```typescript
public readonly elbOther5XXAlarm: CompositeAlarm;
```

- *Type:* aws-cdk-lib.aws_cloudwatch.CompositeAlarm

---


## Structs <a name="Structs" id="Structs"></a>

### ELBOther5XXAlarmProps <a name="ELBOther5XXAlarmProps" id="elb-other-5xx-alarm.ELBOther5XXAlarmProps"></a>

#### Initializer <a name="Initializer" id="elb-other-5xx-alarm.ELBOther5XXAlarmProps.Initializer"></a>

```typescript
import { ELBOther5XXAlarmProps } from 'elb-other-5xx-alarm'

const eLBOther5XXAlarmProps: ELBOther5XXAlarmProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#elb-other-5xx-alarm.ELBOther5XXAlarmProps.property.alarmActions">alarmActions</a></code> | <code>aws-cdk-lib.aws_cloudwatch.IAlarmAction[]</code> | Alarm actions using in this alarm. |
| <code><a href="#elb-other-5xx-alarm.ELBOther5XXAlarmProps.property.evaluationPeriods">evaluationPeriods</a></code> | <code>number</code> | The number of periods over which data is compared to the specified threshold. |
| <code><a href="#elb-other-5xx-alarm.ELBOther5XXAlarmProps.property.loadBalancerFullName">loadBalancerFullName</a></code> | <code>string</code> | Full name of the target LoadBalancer. |
| <code><a href="#elb-other-5xx-alarm.ELBOther5XXAlarmProps.property.threshold">threshold</a></code> | <code>number</code> | The value against which the specified statistic is compared. |
| <code><a href="#elb-other-5xx-alarm.ELBOther5XXAlarmProps.property.alarmDescription">alarmDescription</a></code> | <code>string</code> | Description for the alarm. |
| <code><a href="#elb-other-5xx-alarm.ELBOther5XXAlarmProps.property.alarmName">alarmName</a></code> | <code>string</code> | Name of the alarm. |
| <code><a href="#elb-other-5xx-alarm.ELBOther5XXAlarmProps.property.datapointsToAlarm">datapointsToAlarm</a></code> | <code>number</code> | The number of datapoints that must be breaching to trigger the alarm. |
| <code><a href="#elb-other-5xx-alarm.ELBOther5XXAlarmProps.property.period">period</a></code> | <code>aws-cdk-lib.Duration</code> | The period over which the specified statistic is applied. |

---

##### `alarmActions`<sup>Required</sup> <a name="alarmActions" id="elb-other-5xx-alarm.ELBOther5XXAlarmProps.property.alarmActions"></a>

```typescript
public readonly alarmActions: IAlarmAction[];
```

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction[]

Alarm actions using in this alarm.

---

##### `evaluationPeriods`<sup>Required</sup> <a name="evaluationPeriods" id="elb-other-5xx-alarm.ELBOther5XXAlarmProps.property.evaluationPeriods"></a>

```typescript
public readonly evaluationPeriods: number;
```

- *Type:* number

The number of periods over which data is compared to the specified threshold.

---

##### `loadBalancerFullName`<sup>Required</sup> <a name="loadBalancerFullName" id="elb-other-5xx-alarm.ELBOther5XXAlarmProps.property.loadBalancerFullName"></a>

```typescript
public readonly loadBalancerFullName: string;
```

- *Type:* string

Full name of the target LoadBalancer.

---

##### `threshold`<sup>Required</sup> <a name="threshold" id="elb-other-5xx-alarm.ELBOther5XXAlarmProps.property.threshold"></a>

```typescript
public readonly threshold: number;
```

- *Type:* number

The value against which the specified statistic is compared.

---

##### `alarmDescription`<sup>Optional</sup> <a name="alarmDescription" id="elb-other-5xx-alarm.ELBOther5XXAlarmProps.property.alarmDescription"></a>

```typescript
public readonly alarmDescription: string;
```

- *Type:* string
- *Default:* No description

Description for the alarm.

---

##### `alarmName`<sup>Optional</sup> <a name="alarmName" id="elb-other-5xx-alarm.ELBOther5XXAlarmProps.property.alarmName"></a>

```typescript
public readonly alarmName: string;
```

- *Type:* string
- *Default:* Automatically generated name

Name of the alarm.

---

##### `datapointsToAlarm`<sup>Optional</sup> <a name="datapointsToAlarm" id="elb-other-5xx-alarm.ELBOther5XXAlarmProps.property.datapointsToAlarm"></a>

```typescript
public readonly datapointsToAlarm: number;
```

- *Type:* number
- *Default:* ``evaluationPeriods``

The number of datapoints that must be breaching to trigger the alarm.

This is used only if you are setting an "M
out of N" alarm. In that case, this value is the M. For more information, see Evaluating an Alarm in the Amazon
CloudWatch User Guide.

> [https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarm-evaluation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarm-evaluation)

---

##### `period`<sup>Optional</sup> <a name="period" id="elb-other-5xx-alarm.ELBOther5XXAlarmProps.property.period"></a>

```typescript
public readonly period: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* Duration.minutes(5)

The period over which the specified statistic is applied.

---



