require('dotenv').config();

const express = require('express');
const cors = require('cors');
const paymentRoutes = require('./routes/paymentRoutes.js');
const mongoose = require('mongoose')

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("It is working");
});

app.use('/', paymentRoutes);

// app.listen(3000, () => {
//     console.log("listening on port 3000");
// });

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