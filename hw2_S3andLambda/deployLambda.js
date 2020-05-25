//deployLambda.js

var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
var lambda = new AWS.Lambda({
    "apiVersion" : '2015-03-31',
});

var params = {
    Code : {
        S3Bucket : '2020-cit-s3-psh',
        S3Key : 'createS3Object_psh.zip'
    },
    FunctionName : 'createS3Object_psh',
    Handler : 'index.handler',
    Role : 'arn:aws:iam::333596333771:role/myRoleTest2',
    Runtime : 'nodejs12.x',
    Description : ''
};

lambda.createFunction(params, function(err,data){
    if(err) console.log(err);
    else console.log(data);
});
