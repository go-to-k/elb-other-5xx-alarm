import { Duration } from 'aws-cdk-lib';
import {
  Alarm,
  AlarmRule,
  AlarmState,
  ComparisonOperator,
  CompositeAlarm,
  IAlarmAction,
  Metric,
  TreatMissingData,
} from 'aws-cdk-lib/aws-cloudwatch';
import { Construct } from 'constructs';

export interface ELBOther5XXAlarmProps {
  /**
   * Full name of the target LoadBalancer.
   */
  readonly loadBalancerFullName: string;

  /**
   * Alarm actions using in this alarm.
   */
  readonly alarmActions: IAlarmAction[];

  /**
   * The period over which the specified statistic is applied.
   *
   * @default Duration.minutes(5)
   */
  readonly period?: Duration;

  /**
   * Name of the alarm.
   *
   * @default Automatically generated name
   */
  readonly alarmName?: string;

  /**
   * Description for the alarm.
   *
   * @default No description
   */
  readonly alarmDescription?: string;

  /**
   * The value against which the specified statistic is compared.
   *
   */
  readonly threshold: number;

  /**
   * The number of periods over which data is compared to the specified threshold.
   *
   */
  readonly evaluationPeriods: number;

  /**
   * The number of datapoints that must be breaching to trigger the alarm.
   *
   * This is used only if you are setting an "M
   * out of N" alarm. In that case, this value is the M. For more information, see Evaluating an Alarm in the Amazon
   * CloudWatch User Guide.
   *
   * @default ``evaluationPeriods``
   * @see https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarm-evaluation
   */
  readonly datapointsToAlarm?: number;
}

export class ELBOther5XXAlarm extends Construct {
  /**
   * The composite alarm resource for HTTPCode_ELB_5XX_Count excluding 500, 502, 503, and 504.
   */
  public readonly elbOther5XXAlarm: CompositeAlarm;

  constructor(scope: Construct, id: string, props: ELBOther5XXAlarmProps) {
    super(scope, id);

    const httpCodeELB5XXCountAlarm = new Alarm(this, 'HTTPCodeELB5XXCountAlarm', {
      metric: new Metric({
        namespace: 'AWS/ApplicationELB',
        metricName: 'HTTPCode_ELB_5XX_Count',
        dimensionsMap: { LoadBalancer: props.loadBalancerFullName },
        statistic: 'Sum',
        period: props.period,
      }),
      actionsEnabled: false,
      comparisonOperator: ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      threshold: props.threshold,
      treatMissingData: TreatMissingData.NOT_BREACHING,
      evaluationPeriods: props.evaluationPeriods,
      datapointsToAlarm: props.datapointsToAlarm,
    });

    const httpCodeELB500CountAlarm = new Alarm(this, 'HTTPCodeELB500CountAlarm', {
      metric: new Metric({
        namespace: 'AWS/ApplicationELB',
        metricName: 'HTTPCode_ELB_500_Count',
        dimensionsMap: { LoadBalancer: props.loadBalancerFullName },
        statistic: 'Sum',
        period: props.period,
      }),
      actionsEnabled: false,
      comparisonOperator: ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      threshold: props.threshold,
      treatMissingData: TreatMissingData.NOT_BREACHING,
      evaluationPeriods: props.evaluationPeriods,
      datapointsToAlarm: props.datapointsToAlarm,
    });

    const httpCodeELB502CountAlarm = new Alarm(this, 'HTTPCodeELB502CountAlarm', {
      metric: new Metric({
        namespace: 'AWS/ApplicationELB',
        metricName: 'HTTPCode_ELB_502_Count',
        dimensionsMap: { LoadBalancer: props.loadBalancerFullName },
        statistic: 'Sum',
        period: props.period,
      }),
      actionsEnabled: false,
      comparisonOperator: ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      threshold: props.threshold,
      treatMissingData: TreatMissingData.NOT_BREACHING,
      evaluationPeriods: props.evaluationPeriods,
      datapointsToAlarm: props.datapointsToAlarm,
    });

    const httpCodeELB503CountAlarm = new Alarm(this, 'HTTPCodeELB503CountAlarm', {
      metric: new Metric({
        namespace: 'AWS/ApplicationELB',
        metricName: 'HTTPCode_ELB_503_Count',
        dimensionsMap: { LoadBalancer: props.loadBalancerFullName },
        statistic: 'Sum',
        period: props.period,
      }),
      actionsEnabled: false,
      comparisonOperator: ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      threshold: props.threshold,
      treatMissingData: TreatMissingData.NOT_BREACHING,
      evaluationPeriods: props.evaluationPeriods,
      datapointsToAlarm: props.datapointsToAlarm,
    });

    const httpCodeELB504CountAlarm = new Alarm(this, 'HTTPCodeELB504CountAlarm', {
      metric: new Metric({
        namespace: 'AWS/ApplicationELB',
        metricName: 'HTTPCode_ELB_504_Count',
        dimensionsMap: { LoadBalancer: props.loadBalancerFullName },
        statistic: 'Sum',
        period: props.period,
      }),
      actionsEnabled: false,
      comparisonOperator: ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      threshold: props.threshold,
      treatMissingData: TreatMissingData.NOT_BREACHING,
      evaluationPeriods: props.evaluationPeriods,
      datapointsToAlarm: props.datapointsToAlarm,
    });

    const elbConcreteStatusSuppressorAlarm = new CompositeAlarm(
      this,
      'ELBConcreteStatusSuppressorAlarm',
      {
        actionsEnabled: false,
        alarmRule: AlarmRule.anyOf(
          AlarmRule.fromAlarm(httpCodeELB500CountAlarm, AlarmState.ALARM),
          AlarmRule.fromAlarm(httpCodeELB502CountAlarm, AlarmState.ALARM),
          AlarmRule.fromAlarm(httpCodeELB503CountAlarm, AlarmState.ALARM),
          AlarmRule.fromAlarm(httpCodeELB504CountAlarm, AlarmState.ALARM),
        ),
      },
    );

    this.elbOther5XXAlarm = new CompositeAlarm(this, 'Resource', {
      compositeAlarmName: props.alarmName,
      alarmDescription: props.alarmDescription,
      actionsEnabled: true,
      alarmRule: AlarmRule.allOf(
        AlarmRule.fromAlarm(httpCodeELB5XXCountAlarm, AlarmState.ALARM),
        AlarmRule.not(AlarmRule.fromAlarm(elbConcreteStatusSuppressorAlarm, AlarmState.ALARM)),
      ),
      actionsSuppressor: elbConcreteStatusSuppressorAlarm,
      actionsSuppressorExtensionPeriod: Duration.seconds(60),
      actionsSuppressorWaitPeriod: Duration.seconds(60),
    });
    this.elbOther5XXAlarm.addAlarmAction(...props.alarmActions);
  }
}
