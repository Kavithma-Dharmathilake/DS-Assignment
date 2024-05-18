require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const certificateRoute = require('./routes/certificate')

const path = require('path')
const cors = require('cors');

// express app
const app = express()

app.use(cors({ origin: 'http://localhost:5173' }));

// Parse JSON request bodies
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


app.use('/api/certificate', certificateRoute)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
