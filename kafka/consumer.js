const { kafka } = require('./kafkaClient');

const group = process.argv[2];

const init = async () => {

    const consumer = kafka.consumer({ groupId: group });
    
    await consumer.connect();

    await consumer.subscribe({ topics: ['driver-updates'], fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(
                `${group} --> [${topic}]: Part:${partition}: ${message.value.toString()}`
            );
        }
    });
}

init();
