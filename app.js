const cors = require("cors")
const express = require('express')
const bodyParser = require('body-parser')

const projectRoutes = require('./routes/Routes')


const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 5000000}));

app.use("/", Routes)

module.exports = app