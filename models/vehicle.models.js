const mongoose = require('mongoose')

const vehicleSchema =new mongoose.Schema({
    ownerName: {
        type: String
    },
    ownerContact: {
        type: String
    },
    ownerAdrress: {
        type: String
    }, 
    vehicleChassiNumber:{
        type:String
    },
    vehicleRegistrationNumber: {
        type: String
    },
    images:[]
})

module.exports=mongoose.model('Vehicle', vehicleSchema)