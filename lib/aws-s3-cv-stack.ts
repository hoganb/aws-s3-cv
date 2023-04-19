import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';

export class AwsS3CvStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const bucket = new s3.Bucket(this, 'CVBucket', {
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      publicReadAccess: true,
    });

    new s3deploy.BucketDeployment(this, 'CVDeployment', {
      destinationBucket: bucket,
      sources: [s3deploy.Source.asset('./assets', { exclude: ['**', '!cv.txt'] })],
    });

    new cdk.CfnOutput(this, 'Bucket ARN', {
      value: bucket.bucketArn
    });

    new cdk.CfnOutput(this, 'Bucket URL', {
      value: bucket.bucketWebsiteUrl
    });
  }
}
