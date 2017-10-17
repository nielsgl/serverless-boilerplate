#!/bin/bash
AWS_DOC_API_ID=`serverless info --verbose | grep 'AwsDocApiId' | awk '{print $2}'`
aws apigateway get-export --rest-api-id $AWS_DOC_API_ID --stage-name dev --export-type swagger --parameters extensions='postman' --accepts application/yaml docs/swagger.yml
