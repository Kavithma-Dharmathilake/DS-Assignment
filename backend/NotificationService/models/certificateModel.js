const mongoose = require('mongoose')

const Schema = mongoose.Schema

const certificateSchema = new Schema({
    courseCode:{
        type: String,
        required:true
    },
    userName: {
        type: String,
        required: true
      }, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'pending'
    }
})


module.exports = mongoose.model('Request', certificateSchema)