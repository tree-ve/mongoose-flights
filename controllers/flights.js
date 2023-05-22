const Flight = require('../models/flight');

module.exports = {
  index,
  new: newFlight,
  create
};

async function index(req, res) {
  const flights = await Flight.find({});
  res.render('flights/index', { flights });
}

function newFlight(req, res) {
  // const newFlight = new Flight();
  const dt = newFlight.departs;
  let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
  departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
  res.render('flights/new', { departsDate });
  // We'll want to be able to render an  
  // errorMsg if the create action fails
  res.render('flights/new', { errorMsg: '' });
}

async function create(req, res) {
    for (let key in req.body) {
       if (req.body[key] === '') delete req.body[key];
    }
    try {
        await Flight.create(req.body);
        // Always redirect after CUDing data
        // We'll refactor to redirect to the flights index after we implement it
        res.redirect('/flights');  // Update this line
    } catch (err) {
        // Typically some sort of validation error
        console.log(err);
        res.render('flights/new', { errorMsg: err.message });
    }
}