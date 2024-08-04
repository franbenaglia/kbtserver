const { kafka } = require('./kafkaClient');
//const uuidv4 = require('uuidv4');

const consumer = async (topic, fromBeginning, f) => {

    let group = 'group1';

    const consumer = kafka.consumer({ groupId: group });

    await consumer.connect();

    await consumer.subscribe({ topics: [topic], fromBeginning: fromBeginning });
    
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(
                `${group} --> [${topic}]: Part:${partition}: ${message.value.toString()}`
            );
            f(message);
        }
    });
}

module.exports = consumer;
