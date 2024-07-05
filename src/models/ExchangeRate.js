const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExchangeRateSchema = new Schema({
    date: { 
        type: String,
        required: true 
    },
    currency: {
         type: String,
         required: true 
        },
    rate: { 
        type: Number,
        required: true 
    },
});

module.exports = mongoose.model('ExchangeRate', ExchangeRateSchema);
