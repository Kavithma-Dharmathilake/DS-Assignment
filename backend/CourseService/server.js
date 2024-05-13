require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const courseRoutes = require('./routes/courses')
const courseContentRoutes = require('./routes/courseContents')


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



//training management module uploads
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'uploads')))




//courses routes
app.use('/api/courses', courseRoutes)
app.use('/api/courseContents', courseContentRoutes)


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
