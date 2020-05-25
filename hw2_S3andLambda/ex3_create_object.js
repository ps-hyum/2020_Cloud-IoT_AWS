var AWS = require('aws-sdk');
var fs = require('fs');

AWS.config.region = 'us-east-1';
AWS.config.apiVersion = {
    s3 : '2006-03-01',
};

// var s3 = new AWS.S3({
//     "accessKeyId" : "",
//     "secretAccessKey" : ""
// });

var s3 = new AWS.S3();

function createObject(params){
    return new Promise(function(resolve, reject){
        s3.upload(params, function (err, data){
            if(err) reject(err);
            else resolve(data);
        })
    });
}

var test = async function(){
    try{
        //1st Object
        const co_params1 = {
            Bucket : "2020-cit-s3-psh",
            Key : 'object_fot_task1.2.txt',
            Body : fs.createReadStream("./object_fot_task1.2.txt")
        };
        var res2 = await createObject(co_params1);
        console.log(res2);
    } catch(err){
        console.log('-- Error --');
        console.log(err);
    }
}

test();