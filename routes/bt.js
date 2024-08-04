const express = require('express');
const btController = require('../controllers/bt.js');
const router = express.Router();

router.get("/all", btController.findAll);

module.exports = router;