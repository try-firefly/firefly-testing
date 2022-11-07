## Prerequisites

* AWS CLI

## Setup

* Create `nodejs` lambda function in AWS console using the name `firefly-error-test`
* `cd` into the `firefly-test` directory and run the folloing commands, replacing region with the region in which your lambda function resides:

```
$ aws lambda update-function-code --function-name firefly-error-test --zip-file fileb://function.zip
```

* Navigate to the AWS parameter store and create a new parameter
  * Name: `failureLambdaConfig`
  * Value: `{"isEnabled": true, "failureMode": "latency", "rate": 1, "minLatency": 100, "maxLatency": 400, "exceptionMsg": "Exception message!", "statusCode": 404, "diskSpace": 100, "denylist": ["s3.*.amazonaws.com", "dynamodb.*.amazonaws.com"]}`

* Add the following environment variable to your function `FAILURE_INJECTION_PARAM` and set the value to `failureLambdaConfig`

## Permissions

* Go to your function in the AWS console
* Navigate to `Configuration > Permissions`
* Click the functions role
* Click `Add permissions` and `Create inline policy`
* In the JSON editor paste the following
  * Replace region and account number with your relevant details
  * Run the following command `aws sts get-caller-identity` to get your account number

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
              "ssm:GetParameter",
              "ssm:GetParameters",
              "ssm:GetParametersByPath",
              "ssm:PutParameter",
              "ssm:DeleteParameter",
              "ssm:DeleteParameters"
            ],
            "Resource": [
              "arn:aws:ssm:<region>:<account-number>:parameter/failureLambdaConfig"
            ]
        }
    ]
}
```

* Click `Review policy`
* Provide the following name `firefly-test-parameter-policy` and click `Create policy`

Please see the `failure-lambda` module [here](https://github.com/gunnargrosch/failure-lambda) for relevant instructions on adpating the parameter to create different error types.

## Function invoker

* add the URL's that will invoke your aws lambdas (or any serverless function), to the array called `FAAS_URLS`
* set `INTERVAL` to the rate (in milliseconds) you want `setTimeout` to be called
* set `VARIANCE` to the maximum of your random time range (in milliseconds) for the function to be invoked
