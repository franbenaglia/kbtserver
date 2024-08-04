require('dotenv').config();

module.exports = {
    URL: process.env.URL || 'http://localhost:',
    PRIVATE_ADD: process.env.PRIVATE_ADD || '192.168.1.40',
    PORT: process.env.PORT || 3001,
    PORT_KAFKA: process.env.PORT_KAFKA || 9092,
    PORT_ZOOKEEPER: process.env.PORT_ZOOKEEPER || 2181,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '153102432694-kq5o458dd8m89g4jf2cchstni661qtun.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || 'y_03SsTJNKG-TftN6gTtPyC5',
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || '510966d0ad1478f0861a',
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET || 'f1fc5569da13806b0d1100db3d8a541fbb227f35',
    FRONT_END_SERVER: process.env.FRONT_END_SERVER || 'http://localhost:8100',
    URL_MONGO_DB: 'mongodb://myadmin:password@localhost:27017/crud-node-express', //kbt
}