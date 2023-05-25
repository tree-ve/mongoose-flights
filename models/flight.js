const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    },
    arrival: {
        type: Date,
        default: function() {
            newDt = new Date()
            let defaultDate = new Date(newDt.getFullYear() + 1, newDt.getMonth(), newDt.getDay() + 1, newDt.getHours(), newDt.getMinutes())
            // return `${newDt.getFullYear() + 1}-${newDt.toLocaleString('default', { month: 'long' })}-${newDt.getDate()}`
            return defaultDate
        },
    }
  }, {
    timestamps: true
  });


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
        max: 9999,
        required: true
    },
    departs: {
        type: Date,
        default: function() {
            newDt = new Date()
            let defaultDate = new Date(newDt.getFullYear() + 1, newDt.getMonth(), newDt.getDay(), newDt.getHours(), newDt.getMinutes())
            // return `${newDt.getFullYear() + 1}-${newDt.toLocaleString('default', { month: 'long' })}-${newDt.getDate()}`
            return defaultDate
        },
    },
    destinations: [destinationSchema]
}, {
    timestamps: true
});

// Compile the schema into a model and export it
module.exports = mongoose.model('Flight', flightSchema);