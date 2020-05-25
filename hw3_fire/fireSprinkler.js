//fireSprinkler.js
var awsIot = require('aws-iot-device-sdk');

var fireSprinkle = awsIot.device({
  keyPath: "./credentials/fireSprinkle/6a52ac39b6-private.pem.key",
  certPath: "./credentials/fireSprinkle/6a52ac39b6-certificate.pem.crt",
  caPath: "./credentials/AmazonRootCA1.pem",
  clientId: "fireSprinkle",
  host: "a1og1n36piw95t-ats.iot.us-east-1.amazonaws.com"
});

fireSprinkle.on('connect', function () {
  console.log('Fire Sprinkler connected');
  fireSprinkle.subscribe('fire/sprinkler', function () {
    console.log('subscribing to the topic fire/sprinkler !');
  });

  fireSprinkle.on('message', function (topic, message) {
    if (topic == 'fire/sprinkler') {
      var noti = JSON.parse(message.toString());
      if (noti.command == 'on') console.log(noti.alarm, ': activate sprinkler')
      else console.log(noti.alarm, ': deactivate sprinkler')
    }
  })
});

