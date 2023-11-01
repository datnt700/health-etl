const express = require('express');
const router = express.Router();
const dataController = require('../controllers/DataController');
router.get('/', dataController.index);
module.exports = router;
