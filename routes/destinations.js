const express = require('express');
const router = express.Router();
const destinationsCtrl = require('../controllers/destinations');

// POST /flights/:id/destinations (create destination for a flight)
router.post('/flights/:id/destinations', destinationsCtrl.create);

// router.put('/flights/:id/destinations', destinationsCtrl.update);

module.exports = router;