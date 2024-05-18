const Course = require('../models/courseModel');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require("path")

//get all courses
const getAllCourses = async (req, res) => {
    const courses = await Course.find({}).sort({createdAt: -1})

    res.status(200).json(courses)
}

//get a single course
const getCourse = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such course'})
    }  

    const course = await Course.findById(id)

    if(!course){
        return res.status(404).json({error: 'No such course'})
    }

    res.status(200).json(course)
}

const getTeacherCourse = async (req, res) => {
    const { id } = req.params;
    console.log(id);

 

    try {
        // Assuming Course schema has a 'teacherId' field
        const courses = await Course.find({ teacher: id });

        if (!courses || courses.length === 0) {
            return res.status(404).json({ error: 'No courses found for this teacher' });
        }

        res.status(200).json(courses);
    } catch (error) {
        console.error('Error fetching teacher courses:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const getAcceptedTeacherCourses = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        // Assuming Course schema has a 'teacherId' field and a 'status' field
        const courses = await Course.find({ teacher: id, status: 'Accepted' });

        if (!courses || courses.length === 0) {
            return res.status(404).json({ error: 'No accepted courses found for this teacher' });
        }

        res.status(200).json(courses);
    } catch (error) {
        console.error('Error fetching accepted teacher courses:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const getRejectedTeacherCourses = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        // Assuming Course schema has a 'teacherId' field and a 'status' field
        const courses = await Course.find({ teacher: id, status: 'Pending' });

        if (!courses || courses.length === 0) {
            return res.status(404).json({ error: 'No accepted courses found for this teacher' });
        }

        res.status(200).json(courses);
    } catch (error) {
        console.error('Error fetching accepted teacher courses:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getTeacherCourseCount = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        // Assuming Course schema has a 'teacherId' field
        const courseCount = await Course.countDocuments({ teacher: id });

        res.status(200).json({ courseCount });
    } catch (error) {
        console.error('Error fetching teacher course count:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


//create a new course
const createCourse = async (req, res) => {
    const {name, courseCode, duration, description,price,teacher} = req.body
    console.log(req.file)
    let file = null

    let emptyFields = []

    if(!req.file){
        emptyFields.push('file')
    }else {
        file = req.file.path
    }

    if(!name){
        emptyFields.push('name')
    }
    if(!courseCode){
        emptyFields.push('courseCode') 
    }
    if(!duration){
        emptyFields.push('duration')
    }
    if(!description){
        emptyFields.push('description')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields })
    }

    //add documentat to db
    try{
        const course = await Course.create({name, courseCode, duration, description, file,price,teacher})
        res.status(200).json({course})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}


//delete a course
const deleteCourse = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such course'})
    }

    const course = await Course.findOneAndDelete({_id: id})

    if(!course){
        return res.status(404).json({error: 'No such course'})
    }

    res.status(200).json(course)
}

//update a course
const updateCourse = async (req, res) => {
    const { id } = req.params   
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such course'})
    }

    const course = await Course.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!course){
        return res.status(404).json({error: 'No such course'})
    }

    res.status(200).json(course)    
}

const AcceptCourse = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such course' });
    }

    try {
        let course = await Course.findOneAndUpdate(
            { _id: id },
            { ...req.body, status: 'Accepted' }, // Update the status to 'accept'
            { new: true } // Return the updated document
        );

        if (!course) {
            return res.status(404).json({ error: 'No such course' });
        }

        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const DeclineCourse = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such course' });
    }

    try {
        let course = await Course.findOneAndUpdate(
            { _id: id },
            { ...req.body, status: 'Rejected' }, // Update the status to 'accept'
            { new: true } // Return the updated document
        );

        if (!course) {
            return res.status(404).json({ error: 'No such course' });
        }

        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    getAllCourses,
    getCourse,
    createCourse,
    deleteCourse,
    updateCourse,
    getTeacherCourse,
    AcceptCourse,
    DeclineCourse,
    getTeacherCourseCount,
    getAcceptedTeacherCourses,
    getRejectedTeacherCourses

}