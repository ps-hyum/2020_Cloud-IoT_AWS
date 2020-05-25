// lambda function for calculator 
exports.handler = async (event) => {

  // createS3Object.js
  var pkeys = require("./configuration.json");
  var fs = require('fs');
  var AWS = require('aws-sdk');
  AWS.config.region = 'us-east-1';
  var s3 = new AWS.S3({
    "apiVersion": '2006-03-01',
    "accessKeyId": pkeys.accessKeyId,
    "secretAccessKey": pkeys.secretAccessKey,
    "sessionToken": pkeys.sessionToken
  });

  function createObject(params) {
    return new Promise(function (resolve, reject) {
      s3.upload(params, function (err, data) {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  async function createObjectByLambda(params) {
    try {
      var lc_params = {
        Bucket: '2020-cit-s3-psh',
        Key: 'testtest.json',
        Body: fs.createReadStream("./credentials.json")
      }
      var res = await createObject(lc_params);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }


  event.result = createObjectByLambda(event);

  const response = {
    statusCode: 200,
    body: JSON.stringify(event)
  };
  return response;
};


