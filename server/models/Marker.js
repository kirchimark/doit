const mongoose = require('mongoose');

const markerSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    lat: {type: Number, required: true},
    long: {type: Number, required: true}, 
    userId: {type: String, required: true},
    description: {type: String},
});

module.exports = mongoose.model('Marker' , markerSchema);