const iosock = require("socket.io");
const FRONT_END_SERVER = require('../config/constants').FRONT_END_SERVER;
const producer = require('../kafka_pc/producer');
const consumer = require('../kafka_pc/consumer');

const socketio = (server) => {

    const io = iosock(server, {
        cors: {
            origin: FRONT_END_SERVER
        }
    });

    const f = (m) => {
        io.emit("btme", 'from kafka througth socketio ' + JSON.parse(m.value.toString()).message); //bt to sender
    };

    consumer('temperature', true, f);

    io.on('connection', socket => {

        console.log('connect to:' + socket.id);

        socket.on('disconnect', () => {
            console.log('disconnect');
        });

        socket.on("btmessage", (c, callback) => {
            console.log('bt: ' + JSON.stringify(c));
            callback("got it");
            socket.broadcast.emit("btallwithoutme", c);//bt all without sender
            //io.emit("btme", c); //bt to sender
            producer('temperature', 0, 'temperature-update', c).then(r => console.log(r));
        });

    });

}

module.exports = socketio;