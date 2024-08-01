const express = require('express')
const mongoose = require("mongoose");
const app = express()
const port = 8080
app.use(express.json())
const multer  = require('multer')
const upload = multer({ dest: 'public/uploads/' })
const user = require('./routes/user')
app.use(express.static('public'));

const username = "sithum";
const password = "sithum24";
const cluster = "@cluster0.b6zwdil";
const dbname = "vehicleManager";

mongoose.connect(
  'mongodb+srv://sithum:sithum24@cluster0.b6zwdil.mongodb.net/?retryWrites=true&w=majority');


app.use('/user', user)
// mongoose.connect(url, {useNewUrlParser: true})
const con = mongoose.connection

con.on('error', console.error.bind(console, "connection error: "));
con.once("open", function () {
  console.log("Connected successfully");
});


app.post('/', upload.single('avatar'), (req, res, next) => {
  console.log(req.file.path, req.body.name)
  res.send('saved')
})

app.get('/', (req, res) => {
  res.send('Hello Huto!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})