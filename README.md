# aws-s3-cv
Deploy and host CV on a S3 bucket with public access URL exposed.

This project involves creating an AWS CDK stack to deploy a static website to an S3 bucket. The website contains a single file, `cv.txt`, which is publicly accessible through the bucket's website URL. The deployment process involves syncing the local assets directory to the S3 bucket using the `aws-cdk-lib/aws-s3-deployment` module. The stack outputs the bucket's ARN and website URL using `cdk.CfnOutput`. The goal of the project is to provide a simple example of deploying a static website to S3 using AWS CDK.

# How to Run

* `cdk deploy` - Deploys the CDK stack to AWS, from there can access the public URL
* `cdk destroy` - Destroys the CDK stack from AWS, to clean-up

# AWS Services
This project uses the following AWS services:

1. **Amazon S3** - to store and serve static website files
2. **AWS CDK** - to define infrastructure as code and deploy it
3. **AWS CloudFormation** - to provision and manage AWS resources in a safe, repeatable manner

CDK stack written in TypeScript that creates an S3 bucket in AWS and deploys a static website to it.

Here's a breakdown of the main components of the stack:

- `const bucket = new s3.Bucket(this, 'CVBucket', {...})`: This creates a new S3 bucket with the specified properties. In this case, the `autoDeleteObjects` property is set to `true`, which means that when the stack is deleted, the bucket and all its contents will be deleted as well. The `removalPolicy` property is set to `DESTROY`, which means that when the stack is deleted, the bucket and all its contents will be destroyed. The `publicReadAccess` property is set to `true`, which means that the bucket and its contents will be publicly readable.

  - Bucket policy is defined that allows public access

- `new s3deploy.BucketDeployment(this, 'CVDeployment', {...})`: This creates a new deployment for the S3 bucket that was created in the previous step. It deploys the contents of the `./assets` directory to the bucket, excluding all files except for `cv.txt`.

- `new cdk.CfnOutput(this, 'Bucket ARN', {...})`: This creates a new CloudFormation output that shows the ARN (Amazon Resource Name) of the S3 bucket created in step 1.

- `new cdk.CfnOutput(this, 'Bucket URL', {...})`: This creates a new CloudFormation output that shows the URL of the S3 bucket created in step 1.

Overall, this stack creates an S3 bucket with public read access and deploys a static website to it. It also creates two CloudFormation outputs that show the ARN and URL of the bucket.

# Next Steps

* Integrate CloudFront with the S3 bucket and benefit from edge locations for faster response all around the world
* Hook up Route53 with an alias record for custom domain to route traffic to CloudFront

# Notes

Using `aws-cdk-lib` v2 API where all AWS services are available as sub folders i.e. `aws-cdk-lib/aws-s3` and `aws-cdk-lib/aws-s3-deployment`.

Can use `aws s3 cp DIRECTORY_OR_FILE s3://BUCKET_NAME` CLI command to manually add/put object into S3 bucket.

# References
* **aws-cdk-lib** - https://github.com/aws/aws-cdk/tree/main/packages/aws-cdk-lib