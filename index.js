const passport = require('./security/passport.js');
const { PORT } = require('./config/constants');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const socketio = require('./websocket/socketio.js');
const mongodbConnect = require('./dbase/config.js');
const oauth2Route = require('./routes/oauth2.js');
const btRoute = require('./routes/bt.js');
const initBlt = require('./blt/blt-ble.js');
//const consumer = require('./kafka_pc/consumer');

dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const whitelist = ['http://localhost:8100',];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions));

app.use(session({
    secret: 'thesessionsecret',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

mongodbConnect();

//initBlt();

socketio(server);

//TODO EXAMPLE SAVE DATABASE
//const f = (m) => console.log('el message ' + m.value);

//consumer('temperature', true, f);

app.use('/googleoauth2', oauth2Route);

app.use('/btooth', btRoute);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

server.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});


