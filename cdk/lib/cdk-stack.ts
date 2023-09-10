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
    const fargateService = new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'MyFargateService', {
    cluster,
    taskImageOptions: {
      image: ecs.ContainerImage.fromAsset('/home/ec2-user/environment/springboot-cdk-app/java'), // Path to your Dockerfile
      containerPort: 8080 // This is where you specify the port for your container
    },
    memoryLimitMiB: 512,
    desiredCount: 1,
    listenerPort: 80, // ALB will listen on port 80
    publicLoadBalancer: true, // Ensure the load balancer is publicly accessible
});

 // Customize health check properties
    fargateService.targetGroup.configureHealthCheck({
      path: "/finance", // adjust this to your application's health check endpoint
      interval: cdk.Duration.seconds(30), 
      timeout: cdk.Duration.seconds(5),
      unhealthyThresholdCount: 2,
      healthyThresholdCount: 2,
    });


  }
}
