const { Kafka } = require('kafkajs');
const { PRIVATE_ADD, PORT_KAFKA } = require('../config/constants');

const kafka = new Kafka({
    clientId: 'kafka-app',   //add your app name any
    brokers: [PRIVATE_ADD + ':' + PORT_KAFKA]  // Private IP
});

module.exports = { kafka };