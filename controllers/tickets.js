const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
  addTicket,
  new: newTicket,
  create
};

async function addTicket(req, res) {
  // const flight = await Flight.findById(req.params.id);
  const ticket = await Ticket.findById(req.params.id);
  ticket.flight.push(req.body);
  try {
    await ticket.save();
    console.log('ADD TICKET FUNCTION');
    res.redirect(`/flights/${ticket._id}`);
  } catch (err) {
    console.log('ADD TICKET ERROR MESSAGE ->', err);
    res.render('tickets/new', { errorMsg: '' })
  }
}

async function newTicket(req, res) {
  try {
    const flight = await Flight.findById(req.params.id);
    // const tickets = await Ticket.find({flight: flight._id});
    console.log('NEW TICKET FUNCTION FLIGHT', flight._id);
    console.log('NEW TICKET FUNCTION TICKETS', Ticket);
    res.render('tickets/new', {
      title: 'Make New Ticket',
      errorMsg: '',
      flights: flight
    })
  } catch (err) {
    console.log('NEW TICKET ERROR MESSAGE ->', err);
    res.render('tickets/new', { errorMsg: '' })
  }
}

async function create(req, res) {
  try {
    console.log('ticket ->', req.body);
    console.log('req.params.id', req.params.id)
    const flight = await Flight.findById(req.params.id);
    console.log(flight);
    console.log('flight ->', flight._id);
    console.log('CREATE FUNCTION');
    console.log('');
    console.log(Ticket, req.body);
    await Ticket.create(req.body);
    res.redirect(`../flights/${flight._id}`);
  } catch (err) {
    console.log('CREATE ERROR MESSAGE ->', err);
    const flight = await Flight.findById(req.params.id);
    res.render(`tickets/new`, {
      title: 'Make New Ticket',
      errorMsg: err,
      flights: flight
    })
  }
}