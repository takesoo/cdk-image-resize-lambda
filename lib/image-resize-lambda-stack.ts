import * as cdk from 'aws-cdk-lib'
import { type Construct } from 'constructs'
import * as s3 from 'aws-cdk-lib/aws-s3'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Runtime } from 'aws-cdk-lib/aws-lambda'
import { S3EventSource } from 'aws-cdk-lib/aws-lambda-event-sources'

export class ImageResizeLambdaStack extends cdk.Stack {
  constructor (scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const bucket = new s3.Bucket(this, 'ImageResizeLambdaBucket', {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    })

    const lambdaFunction = new NodejsFunction(this, 'ImageResizeLambdaFunction', {
      entry: 'lambda/handler.ts',
      handler: 'handler',
      runtime: Runtime.NODEJS_18_X
    })

    // LambdaにS3のイベントソースを追加
    lambdaFunction.addEventSource(new S3EventSource(bucket, {
      events: [s3.EventType.OBJECT_CREATED], // S3のオブジェクト作成イベントをトリガーにする
      filters: [{ suffix: '.jpg' }] // 拡張子が.jpgのファイルのみを対象にする
    }))
  }
}
