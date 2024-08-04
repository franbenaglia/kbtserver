const { kafka } = require('./kafkaClient');

const init = async () => {
    const admin = kafka.admin();
    console.log('Admin Connecting....');
    await admin.connect();
    console.log('Admin Connected!');

    console.log('Creating topics...');
    await admin.createTopics({
        topics: [{ topic: 'temperature', numPartitions: 2 }]
    });
    console.log('Topic Creation Successful [temperature]');

    console.log('Disconnecting Admin...');
    await admin.disconnect();
}

init();
