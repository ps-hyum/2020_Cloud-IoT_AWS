//fieDetector.js
var awsIot = require('aws-iot-device-sdk');

var fireDetector = awsIot.device({
  keyPath: "./credentials/fireDetector/42ec05faba-private.pem.key",
  certPath: "./credentials/fireDetector/42ec05faba-certificate.pem.crt",
  caPath: "./credentials/AmazonRootCA1.pem",
  clientId: "fireDetector",
  // MQTT DN for Device Gateway
  host: "a1og1n36piw95t-ats.iot.us-east-1.amazonaws.com" 
});

fireDetector.on('connect', function () {
  console.log('Fire Detector connected');

  var fireState = ['fire', 'nothing'];

  // Every 3 seconds, fireDetector send a request to Fire Management System
  setInterval(function () {
    // randomly select one of the ten images
    var idx = Math.floor(Math.random()*2);
    var message = { 'notify1': 'fire/sprinkler', 'notify2': 'fire/alert', 'alarm': fireState[idx] };
    console.log('publish to fire/alarm' + JSON.stringify(message));
    fireDetector.publish('fire/alarm', JSON.stringify(message));
  }, 3000);
});