import * as cdk from 'aws-cdk-lib'
import { type Construct } from 'constructs'
import * as s3 from 'aws-cdk-lib/aws-s3'

export class ImageResizeLambdaStack extends cdk.Stack {
  constructor (scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    new s3.Bucket(this, 'ImageResizeLambdaBucket', {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    })
  }
}
