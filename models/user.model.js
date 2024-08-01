const mongoose = require('mongoose')
const Vehicle = require('../models/vehicle.models')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    emailId: {
        type: String
    },
    fullName: {
        type: String
    },
    mobile: {
        type: String
    },
    password: {
        type: String
    },
    vehicles: []
})

module.exports = mongoose.model('User', userSchema)