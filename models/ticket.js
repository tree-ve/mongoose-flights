const mongoose = require('mongoose');
const tickets = require('../controllers/tickets');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;


const ticketSchema = new Schema({
    seat: {
        type: String,
        match: /[A-F][1-9]\d?/,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    flight: [{
        type: Schema.Types.ObjectId,
        ref: 'Flight'
    }]
}, {
    timestamps: true
});

// Compile the schema into a model and export it
module.exports = mongoose.model('Ticket', ticketSchema);