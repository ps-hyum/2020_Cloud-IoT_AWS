
//invokeLambda.js

var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
var lambda = new AWS.Lambda ( { 
    "apiVersion" : '2015-03-31',
} );

const exp = { "bName" : '2020-cit-s3-psh',   "oName" : 'object4hw2' };
var params = {
    FunctionName : "createS3Object_psh", // or Function ARN
    // the other options: Event or DryRun
    InvocationType : "RequestResponse", 
    Payload : JSON.stringify(exp)
};
lambda.invoke(params, function (err, data) {
    if(err) console.log(err);
    else console.log(JSON.parse(data.Payload));
});
