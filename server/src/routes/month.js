const express = require('express');
const router = express.Router();

const staDateController = require('../controllers/StaDateController');

router.get('/:id', staDateController.index);

module.exports = router;
