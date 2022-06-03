const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProdcutSchema = Schema({
    name: String,
    picture: String,
    price:{type: Number, default: 0},
    category: {type: String, enum: ['computers','phones','accesories']},
    description: String
});

module.exports = mongoose.model('Product',ProdcutSchema);