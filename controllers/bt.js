const BtModel = require('../model/bt');

const create = async (message) => {

    const bt = new BtModel({
        message: message,
    });

    await bt.save().then(data => {
        console.log('bt saved ' + data);
    }).catch(err => {
        console.log('Error trying to save ' + err);
    });
};

const findAll = async (req, res) => {
    try {
        const c = await BtModel.find();
        res.status(200).json(c);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const destroy = async (req, res) => {
    try {
        await BtModel.deleteMany({});
        res.send({
            message: "Deleted successfully!"
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = { create, findAll, destroy };