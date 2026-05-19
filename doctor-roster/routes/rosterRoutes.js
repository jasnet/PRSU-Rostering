const express = require('express');
const router = express.Router();
const rosterController = require('../controllers/rosterController');

router.get('/generate/:doctorId', rosterController.generateRoster);
router.get('/:doctorId', rosterController.getRoster);

module.exports = router