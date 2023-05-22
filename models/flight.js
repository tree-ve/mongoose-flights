const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;
// const currentDate = Date.now();
// function getDefaultDate(date) {
//     const defaultDate = new Date(date.setFullYear(date.getFullYear(0) + 1));
//     return defaultDate;
// }

const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['American', 'Southwest', 'United']
    },
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    },
    flightNo: {
        type: Number,
        min: 10,
        max: 9999
    },
    departs: {
        type: Date,
        // default: getDefaultDate(Date)
        default: function() {
            return new Date(); // ! STILL NEED TO ADD 1
        },
    }
}, {
    timestamps: true
});

// Compile the schema into a model and export it
module.exports = mongoose.model('Flight', flightSchema);