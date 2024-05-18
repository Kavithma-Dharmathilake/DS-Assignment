const multer = require('multer');
const upload = require('../middleware/multerTraining')
const express = require('express');

const {
    createCourse,
    getAllCourses,
    getCourse,
    deleteCourse,
    updateCourse,
    getTeacherCourse,
    AcceptCourse,
    DeclineCourse,
    getTeacherCourseCount,
    getAcceptedTeacherCourses,
    getRejectedTeacherCourses,
   
} = require('../controllers/courseController');

const router = express.Router();

//GET all courses
router.get('/', getAllCourses);


//GET all courses
router.get('/teacher/:id', getTeacherCourse);

//GET a single course
router.get('/:id', getCourse);

//POST a new course
//router.post('/', createCourse).post(upload.single('file'), createCourse)
router.route('/').get(getCourse).post(upload.single('file'), createCourse)

//DELETE a course
router.delete('/:id', deleteCourse)

//UPDATE a course
router.patch('/:id', updateCourse)

router.patch('/accept/:id', AcceptCourse)

router.patch('/decline/:id', DeclineCourse)

router.get('/coursecount/:id',getTeacherCourseCount)
router.get('/acceptcount/:id',getAcceptedTeacherCourses)
router.get('/rejectcount/:id',getRejectedTeacherCourses)

module.exports = router;