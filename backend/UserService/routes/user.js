const express = require('express')

// controller functions
const { loginUser, signupUser, getUserProfileByEmail,updateUserByEmail,getInstructors, getStudents } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

router.post("/getUserData", getUserProfileByEmail);

router.put("/update", updateUserByEmail);

router.get('/getinst', getInstructors)

router.get('/getstu', getStudents)

module.exports = router