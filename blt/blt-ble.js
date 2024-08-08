const { createBluetooth } = require('node-ble');

const initBlt = async () => {

    const { bluetooth, destroy } = createBluetooth();

    const adapter = await bluetooth.defaultAdapter();

    if (!await adapter.isDiscovering()) {
        console.log('starting discovery');
        await adapter.startDiscovery();
    };

    const device = await adapter.waitDevice('B4:C4:FC:50:60:15'); 
    console.log('got device', await device.getAddress(), await device.getName())
    await device.connect();
    console.log('connected')

    const gattServer = await device.gatt();

    const service1 = await gattServer.getPrimaryService('uuid'); 
    const characteristic1 = await service1.getCharacteristic('uuid');
    await characteristic1.writeValue(Buffer.from("Hello world"));
    const buffer = await characteristic1.readValue();
    console.log(buffer);

    const service2 = await gattServer.getPrimaryService('uuid');
    const characteristic2 = await service2.getCharacteristic('uuid');
    await characteristic2.startNotifications();
    characteristic2.on('valuechanged', buffer => {
        console.log(buffer)
    });
    await characteristic2.stopNotifications();

    await device.disconnect();
    destroy();
}

module.exports = initBlt;