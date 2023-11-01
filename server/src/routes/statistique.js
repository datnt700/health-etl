const express = require('express');
const router = express.Router();

const statistiquesController = require('../controllers/StatistiquesController');

router.get('/:id', statistiquesController.index);

module.exports = router;
