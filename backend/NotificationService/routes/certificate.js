const multer = require('multer');
const express = require('express');

const {

    createCetificateRequest,
    getAllRequests,
    updateRequestStatus,
    DeclineRequest  

} = require('../controllers/NotifyCertificate');

const router = express.Router();

//GET all requests
router.get('/', getAllRequests);

//POST - Create a new requests
router.post('/requestcertificate', createCetificateRequest)

// Update the status of a certificate request
router.patch('/accept/:id', updateRequestStatus)
router.patch('/decline/:id', DeclineRequest)

module.exports = router;