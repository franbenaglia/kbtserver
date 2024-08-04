const mongoose = require('mongoose');

var schema = new mongoose.Schema({

    message: {
        type: String,
        required: true
    },

});

const BtModel = new mongoose.model('Bt', schema);

module.exports = BtModel;