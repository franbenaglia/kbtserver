const noble = require('noble');

const blstart = () => {

    noble.on('stateChange', (state) => {

        if (state === 'poweredOn') {
            console.log('powered on state');
            noble.startScanning();
        }

    });

    noble.on('scanStop', () => {

        console.log('stopped scan');

    });

    noble.on('scanStart', () => {

        console.log('started scan');

    });

    noble.on('discover', (periphal) => {

        console.log('discoverd pheriphal');
        console.log(periphal);

    });

}

blstart();