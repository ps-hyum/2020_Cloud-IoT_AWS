// createS3Object.js

var pkeys = require("./configuration.json");
var fs = require('fs');
var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
var s3 = new AWS.S3({
    "apiVersion" : '2006-03-01',
    "accessKeyId" : pkeys.accessKeyId,
    "secretAccessKey" : pkeys.secretAccessKey,
    "sessionToken" : pkeys.sessionToken
});


function createObject(params){
    return new Promise(function(resolve, reject){
        s3.putObject(params, function(err, data){
            if(err) reject(err);
            else resolve(data);
        });
    });
}

async function createDeploymentPackage(params){
    try {
        var res = await createObject(params);
        console.log(res);
    } catch(err){
        console.log(err);
    }
}

var lc_params = {
    Bucket : '2020-cit-s3-psh', 
    Key : 'createS3Object_psh.zip',
    Body: fs.createReadStream("./createS3Object_psh.zip")
}

pkeys.result = createDeploymentPackage(lc_params);