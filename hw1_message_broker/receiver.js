//receiver.js
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://52.21.8.140');
client.on('connect', () => {
    client.subscribe('ft', () => { console.log('subscribe to ft'); });
});

client.on('message', (topic, message) => {
    var fileName = message;
    console.log(topic, message.toString());
    client.on('message', (topic, message) => {
        var fs = require('fs');
        fs.writeFileSync(fileName, message);
        console.log('complete!');
        client.end();
    });
});