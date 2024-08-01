const express = require('express')
const app = express();
const router = express.Router()

const Vehicle = require('../models/vehicle.models')
const {json} = require("express");

app.use(express, json())

router.get('/', async (req, res) => {
    try {
        const vehicle = await Vehicle.find()
        res.send(vehicle)
    } catch (err) {

    }
})

module.exports = router
