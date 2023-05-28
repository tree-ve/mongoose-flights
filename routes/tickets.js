const express = require('express');
const router = express.Router();
const ticketsCtrl = require('../controllers/tickets');

// This router is mounted to a "starts with" path of '/'

// GET /flights/:id/tickets/new (new functionality)
router.get('/flights/:id/tickets/new', ticketsCtrl.new);

// POST /tickets (create functionality)
// router.post('/tickets', ticketsCtrl.create);
router.post('/tickets/:id', ticketsCtrl.create);

// POST /flights/:id/tickets (associate a ticket with a flight)
// router.post('/tickets/:id', ticketsCtrl.addTicket);

module.exports = router;