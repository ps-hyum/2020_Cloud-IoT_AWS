// lambda function for calculator 
exports.handler = async (event) => {

    // createS3Object.js
    var AWS = require('aws-sdk');
    AWS.config.region = 'us-east-1';
    var s3 = new AWS.S3();

    function createObject(params) {
        return new Promise(function (resolve, reject) {
            s3.putObject(params, function (err, data) {
                if (err) reject(err);
                else console.log("Successfully saved object to " + params.bName + "/" + params.oName);
            });
        });
    }

    async function createObjectByLambda(params){
        try {
            var lc_params = {
                Bucket : params.bName, 
                Key : params.oName,
                Body: JSON.stringify(params)
            }
            var res = await createObject(lc_params);
            console.log(res);
        } catch(err){
            console.log(err);
        }
    }

    
    event.result = await createObjectByLambda(event);

    
};


