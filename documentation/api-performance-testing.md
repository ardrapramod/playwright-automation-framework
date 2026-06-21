## API Performance Testing

## What is performance testing ?
Performance testing is all about validating our application in such a way that what happens when many users use my application at the same time ?
How fast is the application loading? 
How stable is it when multiple users are using my application continuously? 
Whether my application is scalable: that means, can we increase the additional users on our existing application? 

## Different types of performance testing ?
1. Load testing => Load testing is all about testing the system under expected user load by gradually increasing the load. 
For example, the capacity of our application is 100 users. We are going to start from 10 users and gradually increase to 100 and verify application behavior. The main goal of load testing is to check the response time and stability of our application when we are increasing the load. 

2. Stress testing => Trying to push our system beyond the limits 
For example, the capacity of our application is 100 users. Now, we are going to add 10 to 20% more users to our application and verify our application's behavior with additional load. The main goal of stress testing is identifying the breaking point. 

3. Spike testing. => Spike testing is all about a sudden increase or decrease in the load within the specific interval. 
Best example for this load testing is a flash sale happening on Amazon. How exactly is the application behaving when so many users add to it suddenly? The main goal is just to understand the system behavior when sudden spikes happen. 

4. Soak testing or endurance testing => Endurance testing or SOC testing is all about running the system for a long duration continuously. 
Main goal is understanding the memory leakages and degradation of application performance when we are going to maintain the load for so long. 

## Why Why is performance testing so important? 
Performing testing is very important because even if your application is functionally correct, if it is slow or if it is facing some application crashes, your users are going to leave your application immediately. 

Especially, performance testing is very important because your application is working so fast. All users are so happy when your application is so fast. 

## What are all the different tools available in the market to do the performance testing? 
1. Apache JMeter (Open Source )
2. Load runner (Enterprise version )
3. K6 (Open source)
4. Blazemeter (Enterprise version. )
5. Gatling (Open Source)

## What is Jmeter? 
Apache JMeter is an open source performance testing tool. This tool will be used to mainly validate the performance testing related to UI and API. 
Apache JMeter will verify application performance by
- Simulating multiple users. 
- Sending multiple requests like HTTP request, DB request, UI request 
- Validating the performance metrics. 


## How to use JMeter tool to perform API performance testing?  (Step By Step)

- Prerequisites :
(We need to install JDK before running JMeter) (https://download.oracle.com/java/26/latest/jdk-26_windows-x64_bin.exe)

1. Download the JMeter zip file from the JMeter official website (https://dlcdn.apache.org//jmeter/binaries/apache-jmeter-5.6.3.zip)
2. Extract the files from the JMeter zip file. 
3. Navigate to the folder bin, and inside the bin folder double click on the Apache JMeter JAR file. (ApacheJmeter.jar)
4. Wait until the test plan template is getting displayed to begin the performance testing within the JMeter tool. 

## What is the test plan in the JMeter ?
TestPlan is a root container that defines what to test, how to test, and with how many users you want to validate your application. 

Within the test plan, you can add:
- Thread group (Amount of users we want to deploy on our application )
- Samplers (Actual requests to validate )
- Listeners (The component that is going to capture the results )
- Configuration elements (Environment variables and respective values, etc. )

Sample Test Plan :
![alt text](image.png)

## What is Thread Group? 
Thread group is a template where we are going to add the group of virtual users that you want to deploy, the ramp-up period (meaning how much time we want to use to deploy all the users), and the total number of iterations to be done. 

![alt text](image-1.png)
### Different components of Thread Group :

1. Name : Name of your project or purpose of the performance testing 
For Example : - Login Web Service Load Testing,  Application API Performance Testing etc.

2.  Comments : Short description of your performance testing and related scenarios. 
For example, git API performance testing with 100 concurrent users 

3. Action to be taken after a sampler error  :  What should happen when your request is failing in the middle of the execution? 
Continue (default) : Ignore the error and continue the execution. 
Start next thread loop :  Stop current iteration and start the next loop. 
Stop thread : Stop the entire thread for the current user. 
Stop Test : Stop the entire test. 

4. Thread Properties (Most important part of Thread Group )
=> Number of threads or users  : Totally, how many virtual users do we want to deploy? 
Ex: 100 users

=> Ramp up period in seconds : Total time that we want to set to deploy all the users 
Ex: 10 Sec
100 users will be deployed in 10 seconds. That means each and every second, 10 users will be added. 

=> Loop count : Total number of iterations to be executed to repeat the same process 
Ex: 2 Loops ( I want to repeat the same process two times. )

==> Same user on each iteration. : The same session or user will be re-used with the same configuration to run all the API requests. 

=> Delay thread creation until needed. : During the execution process, don't create virtual users until we need to trigger and execute the tests. 

=> Specify Threat Lifetime :

=> Duration : Duration is all about the total time you want to test this application or you want to run this JMeter execution. 
=> Startup Delay : Delay before each and every test begins. For example, if I will add two seconds, after two seconds only it is going to deploy the user and the test API request. 

## What are all the configuration elements available in JMeter? 
Configuration elements are all about a set of templates that we are going to use to maintain the test data or configuration data while sending the API request. 

Right click on the Thread group. => Config element => Select the component. 


Ex: user-defined variables, HTTP header manager. 

User-defined variables will be used to maintain test data when we are sending multiple API requests where we are using common data. 
HTTP header manager will be used to maintain all the header values before sending each and every API request, like authorization token, additional header values, etc. 

## What is HTTP Sampler? 
Sampler is all about the request that you want to validate in terms of performance testing. 
Right click on the thread group => Select sampler ==> select HTTP sampler. 

Http Sampler : HTTP Sampler is a template where we are going to update all the API request details to validate the performance of any API. 

## Assertions in JMETER ?
Assertions are all about a set of JMETER methods helping us to validate the API response with respect to the expected result. 
- Assertions are going to ensure the correctness of each and every request. 
- It can catch the failure. 
- It is going to validate the response data. 

## Listeners in JMeter ?
Listeners are nothing but a set of components in JMETER that can record the test results related to the performance metrics. 
View results tree => This listener is going to help us to capture each and every request and response details. 
Summary Report => This listener is going to capture the response time for each and every request and the average response time, minimum and maximum times for each and every individual request. 
Assertion results => Assertion results are all about validating each and every assertion added below the HTTP request. 

