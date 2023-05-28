const Flight = require('../models/flight');
const Ticket = require('../models/ticket')
// !
// ! Flight.collection.drop();
// !
module.exports = {
  index,
  show,
  new: newFlight,
  create
};

async function index(req, res) {
  const flights = await Flight.find({}).sort('departs');
  res.render('flights/index', { flights });
}

async function show(req,res) {
  const { id } = req.params
  const flight = await Flight.findById(id);
  const tickets = await Ticket.find({flight: flight._id});
  console.log('flight cntrl ticket -> ', tickets)
  // console.log('Destinations ->', flight)
  // let destLength = flight.toObject().destinations.length
  // let destArr = []
  // for (i = 0; i < destLength; i++) {
  //   console.log(flight.toObject().destinations[i].airport);
  //   destArr.push(flight.toObject().destinations[i].airport);
  // }
  // console.log(destArr);
  // console.log(flight.toObject().destinations[1]);
  // const destinations = await Flight.find({ flight: { $nin: flight.destinations } } ).sort('arrival');
  // console.log('DESTINATIONS ->', destinations)
  res.render('flights/show', {
    title: 'Flight Details',
    flight: flight.toObject(),
    tickets: tickets
    // destinations: flight.destinations,
  });
}

async function newFlight(req, res) {
  try {
    const newFlight = await new Flight();
    const dt = newFlight.departs;
    let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
    departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
    res.render('flights/new', { departsDate, errorMsg: '' });

    // console.log('DEPARTURE DATE ->', departsDate);
    // let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
    // departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
    // res.render('flights/new', { departsDate })
  } catch (err) {
    console.log('ERROR MESSAGE ->', err.message);
    res.render('flights/new', { errorMsg: '' })
  }
}

async function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  try {
    await Flight.create(req.body);
    console.log('FIRST FLIGHT CNTRL LOG ->', req.body)
    res.redirect('/flights');  // Update this line
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render('flights/new', { errorMsg: err.message });
  }
}