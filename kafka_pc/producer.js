const { kafka } = require('./kafkaClient');

const producer = async (topic, partition, key, value) => {

    const producer = kafka.producer();
    console.log('Connecting Producer....');
    
    await producer.connect();
    console.log('Producer Connected!');

    await producer.send({
        topic: topic,
        messages: [
            {
                partition: partition,   //0 o 1?
                key: key,
                value: JSON.stringify(value)
            }
        ]
    });

    await producer.disconnect();
    console.log('Producer Disconnected!');

}

module.exports = producer;
