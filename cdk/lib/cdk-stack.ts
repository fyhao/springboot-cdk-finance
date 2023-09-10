import * as cdk from '@aws-cdk/core';
import * as ecs from '@aws-cdk/aws-ecs';
import * as ecsPatterns from '@aws-cdk/aws-ecs-patterns';
import * as ec2 from '@aws-cdk/aws-ec2';  // <-- Added this import for VPC

export class MyEcsFargateStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a new VPC for the cluster
    const vpc = new ec2.Vpc(this, 'MyVpc');  // <-- Used the correct namespace 'ec2' here

    // Define the ECS Cluster (where your service will be deployed)
    const cluster = new ecs.Cluster(this, 'MyCluster', { vpc: vpc });

    // Define the Fargate Service
    new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'MyFargateService', {
      cluster,
      taskImageOptions: {
        image: ecs.ContainerImage.fromAsset('/home/ec2-user/environment/springboot-cdk-app/java'), // Path to your Dockerfile
      },
      memoryLimitMiB: 512,
      desiredCount: 1,
    });
  }
}
