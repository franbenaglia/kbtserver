const mongoose = require('mongoose');
const URL_MONGO_DB = require('../config/constants').URL_MONGO_DB;

const mongodbConnect = () => {

    mongoose.Promise = global.Promise;

    mongoose.connect(URL_MONGO_DB, {
        useNewUrlParser: true
    }).then(() => {
        console.log("Mongodb database Connected Successfully!!");
    }).catch(err => {
        console.log('Could not connect to the database', err);
        process.exit();
    });

}

module.exports = mongodbConnect;