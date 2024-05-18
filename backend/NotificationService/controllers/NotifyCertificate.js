const Request = require('../models/certificateModel');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require("path")


const createCetificateRequest = async (req, res) => {
    const {courseCode, userName, email, contact} = req.body

    console.log(req.body)
    
    //add documentat to db
    try{
        const certificate = await Request.create({courseCode, userName, email, contact})
        console.log("certificate",certificate)
        res.status(200).json({certificate})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

// Get all requests
const getAllRequests = async (req, res) => {
    try {
        // Fetch requests from the database, sorted by creation date in descending order
        const requests = await Request.find({}).sort({ createdAt: -1 });

        // Send a 200 response with the requests in JSON format
        res.status(200).json(requests);
        console.log("requests:",requests)
    } catch (error) {
        // Handle any errors that occur during the database query
        res.status(500).json({ error: 'Failed to fetch requests in the controller' });
    }
};

// Update request status
const updateRequestStatus = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such request' });
    }

    try {
        let request = await Request.findOneAndUpdate(
            { _id: id },
            { ...req.body, status: 'Accepted' }, // Update the status to 'accept'
            { new: true } // Return the updated document
        );

        if (!request) {
            return res.status(404).json({ error: 'No such request' });
        }

        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const DeclineRequest = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such request' });
    }

    try {
        let request = await Request.findOneAndUpdate(
            { _id: id },
            { ...req.body, status: 'Rejected' }, // Update the status to 'accept'
            { new: true } // Return the updated document
        );

        if (!request) {
            return res.status(404).json({ error: 'No such request' });
        }

        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    createCetificateRequest,
    getAllRequests,
    updateRequestStatus,
    DeclineRequest
}
