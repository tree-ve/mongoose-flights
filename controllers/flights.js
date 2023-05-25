const Flight = require('../models/flight');
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
  const flights = await Flight.find({});
  res.render('flights/index', { flights });
}

async function show(req,res) {
  const { id } = req.params
  const flight = await Flight.findById(id);
  res.render('flights/show', {
    title: 'Flight Details',
    flight: flight.toObject()
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
    console.log('FIRST LOG ->', req.body)
    res.redirect('/flights');  // Update this line
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render('flights/new', { errorMsg: err.message });
  }
}