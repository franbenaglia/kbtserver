const { kafka } = require('./kafkaClient');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const init = async () => {
    const producer = kafka.producer();
    console.log('Connecting Producer....');
    await producer.connect();
    console.log('Producer Connected!');

    rl.setPrompt('>> ');
    rl.prompt();
    rl.on('line', async (line) => {
        const [rider, location] = line.split(' ');

        await producer.send({
            topic: 'driver-updates',
            messages: [
                {
                    partition: location.toLowerCase() === 'n' ? 0 : 1,
                    key: 'location-update',
                    value: JSON.stringify({ name: rider, loc: location })
                }
            ]
        });
    }).on('close', async () => {
        await producer.disconnect();
        console.log('Producer Disconnected!');
    });
}

init();
