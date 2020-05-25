// fireManageSys.js
var awsIot = require('aws-iot-device-sdk');

var fireManageSys = awsIot.device({
    keyPath: "./credentials/fireManageSys/fdae4eae65-private.pem.key",
    certPath: "./credentials/fireManageSys/fdae4eae65-certificate.pem.crt",
    caPath: "./credentials/AmazonRootCA1.pem",
    clientId: "fireManageSys",
    host: "a1og1n36piw95t-ats.iot.us-east-1.amazonaws.com"
});

fireManageSys.on('connect', function () {
    console.log('Fire Management System connected');
    fireManageSys.subscribe('fire/alarm', function () {
        console.log('subscribing to the topic fire/alarm !');
    });

    var registeredAlarm = ['fire', 'nothing'];
    fireManageSys.on('message', function (topic, message) {
        console.log('Request:', message.toString());
        if (topic != 'fire/alarm') return;
        var req = JSON.parse(message.toString());
        var id = registeredAlarm.indexOf(req.alarm);
        if (id == 0) {
            fireManageSys.publish(req.notify1, JSON.stringify({ 'alarm': req.alarm, 'command': 'on' }));
        } else {
            fireManageSys.publish(req.notify1, JSON.stringify({ 'alarm': req.alarm, 'command': 'off' }));
        }
        if (id == 0) {
            fireManageSys.publish(req.notify2, JSON.stringify({ 'alarm': req.alarm }));
        }
    })
});