//sender.js
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://52.21.8.140');

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.setPrompt("FileName : ");
rl.prompt();


rl.on("line", (fileName) => {
    client.publish('ft', fileName);
    console.log('publish : ' + fileName);
    var fs = require('fs');
    var data = fs.readFileSync('./' + fileName);
    //client.publish(fileName+'Data', data);
    client.publish('ft', data);
    console.log('publish : data');
    client.end();
    rl.close();
});