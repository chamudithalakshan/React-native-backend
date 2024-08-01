const express = require('express')
const app = express();
const router = express.Router()

const User = require('../models/user.model')
const { json } = require("express");
const multer = require('multer')

const upload = multer({ dest: 'public/uploads/' })

app.use(express.static('public'));

app.use(express, json())

let images = []

router.get('/vehicles', async (req, res) => {
    try {
        // req.query.emailId
        const users = await User.findOne({'emailId':req.query.emailId})
        res.json(users.vehicles)
    } catch (err) {
        res.send('Error '+err)
    }
})

router.get('/', async (req, res) => {
    try {
        // req.query.emailId
        const users = await User.findOne({'emailId':req.query.emailId})
        res.json(users)
    } catch (err) {
        res.send('Error '+err)
    }
})

// router.delete('/', async(req, res)=>{
//     try {
//         // const users = await User.remove();
//         // res.json(users.vehicles)
//         console.log("deleted")
//     } catch (err) {
//         res.send('Error '+err)
//     }
// })

router.delete('/vehicles/', async(req, res)=>{

    try {
        console.log(req.body)
        const user = await User.updateMany(
            {},
            {$pull:{vehicles:{vehicleChassiNumber:req.body.chassiNo}}}
        )
        
        //  res.json(users.vehicles)
    } catch (err) {
        res.send('Error '+err)
    }
})

router.get('/all', async (req, res) => {
    try {
        const users = await User.find()

        res.json(users)
    } catch (err) {
        res.send('Error ' + err)
    }
})


router.post('/',  async (req, res) => {
    try {
        // const user = await User.find()
        const user = new User({
            emailId: req.body.email,
            fullName: req.body.fullName,
            mobile: req.body.mobile,
            password: req.body.password,
        })
        const response = await user.save();
        res.send(response);
    } catch (err) {

    }
})

router.post('/vehicles', upload.array('photos', 4), async (req, res, next) => {

    try {
        console.log(req.files);
        console.log(req.body);
        req.files.map(file => {
            images.push({
                path: file.path
            })
        })

        // const user = await User.find()
        const users = await User.findOneAndUpdate(
            { 'emailId': req.query.emailId },
            {
                $push: {
                    vehicles: {
                        ownerName: req.body.name,
                        ownerContact: req.body.contact,
                        ownerAdrress: req.body.address,
                        vehicleChassiNumber: req.body.chassi,
                        vehicleRegistrationNumber: req.body.registration,
                        images: images
                    }
                }
            }

        )
        images = [];

        // console.log(req.files);

        // const user = new User({
        //     emailId: users.email,
        //     fullName: users.fullName,
        //     mobile: users.mobile,
        //     password: users.password,
        //     vehicles:
        // })
        // const response = await user.save();

    } catch (err) {

    }
})

module.exports = router
