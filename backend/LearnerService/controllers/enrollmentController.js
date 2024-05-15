require("dotenv").config();
const Enroll = require("../models/enrollmentModel");
const Course = require("../models/courseModel");
const Cart = require("../models/cartModel");
const _ = require("lodash");
const mongoose = require("mongoose");

//enrolling to a new course
const enrollCourse = async (req, res) => {
  try {
    const { userId, courseCode } = req.params;
    const { enrollKey } = req.body;

    //check if the course is exist in the database
    const courseDetails = await Course.findOne({ _id: courseCode });

    console.log(`Course: ${courseDetails}, enrollKey: ${enrollKey}`);

    //check if user already enroll into this course
    if (!courseDetails) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (true) {
      // Check if the user is already enrolled
      const enrolledCheck = await Enroll.findOne({
        userId: userId,
        courseId: courseDetails._id,
      });

      if (!_.isEmpty(enrolledCheck)) {
        return res
          .status(409)
          .json({ message: "You are already enrolled in this course." });
      }

      // Perform enrollment logic here
      const count = 0;
      console.log(courseDetails.name);

      const enrolling = await Enroll.create({
        userId: userId,
        courseId: courseDetails._id,
        courseName: courseDetails.name,
        count: count,
        outOf: courseDetails.duration,
      });

      const mail = [];

      const subject = "Course enrollment";
      const message = `${userId}, you are successfully enrolled into ${courseDetails.name} course.`;

      mail.push(subject, message, userId);
      return res.status(200).json(mail);

      // } else {
      //   console.log("Invalid enrollKey");
      //   return res.status(400).json({ message: "Invalid enrollKey" });
      // }
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getEnrollments = async (req, res) => {
  try {
    // Assuming Enroll model is imported properly
    const myEnrolls = await Enroll.find({
      /* Add filtering criteria if necessary */
    });

    if (myEnrolls.length === 0) {
      return res.status(404).json({ message: "No enrollments found." });
    }

    return res.status(200).json(myEnrolls);
  } catch (error) {
    console.error("Error retrieving enrollments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getStudentsCountPerCourse = async (req, res) => {
  try {
    const studentCounts = await Enroll.aggregate([
      {
        $group: {
          _id: "$courseId",
          students: { $addToSet: "$userId" }, // Collect unique userIds per course
        },
      },
      {
        $project: {
          courseId: "$_id",
          studentCount: { $size: "$students" }, // Calculate the count of unique userIds per course
        },
      },
    ]);

    // If there are no enrollments or no students in any course
    if (!studentCounts || studentCounts.length === 0) {
      return res.status(404).json({ error: "No enrollments found" });
    }

    res.status(200).json(studentCounts);
  } catch (error) {
    console.error("Error fetching student counts per course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const myLernings = async (req, res) => {
  try {
    const { userId } = req.params;

    const myEnrolls = await Enroll.find({ userId: userId });

    const enrolls = [];

    for (const enroll of myEnrolls) {
      enrolls.push({
        courseId: enroll.courseId,
        courseName: enroll.courseName,
      });
    }

    return res.status(200).json(enrolls);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const cancelEnrollment = async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    const record = await Enroll.findOne({ userId: userId, courseId: courseId });
    console.log(record._id);

    const courseDetails = await Course.findOne({ _id: courseId });

    await Enroll.findOneAndDelete({ _id: record._id });

    const mail = [];

    const subject = "Course Unenrollment";
    const message = `${userId}, you are successfully unenrolled from ${courseDetails.name} course.`;

    mail.push(subject, message, userId);

    return res.status(200).json(mail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addToCart = async (req, res) => {
  const { userId, courseId } = req.params;
  console.log(userId, courseId);
  try {
    const courseDetails = await Course.findOne({ _id: courseId });

    if (!courseDetails) {
      return res.status(404).json({ message: "Course not found" });
    } else {
      const { name } = courseDetails;

      // Create cart item with userId, courseId, and courseName
      const cartItem = await Cart.create({
        userId: userId,
        courseId: courseId,
        courseName: name,
        price: courseDetails.price,
      });

      return res.status(200).json(cartItem);
    }
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Error in adding to cart: ", error });
  }
};

const myCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const myItems = await Cart.find({ userId: userId });

    if (!myItems) {
      return res.status(404).json({ message: "Item not found" });
    } else {
      const mycartItems = [];

      for (const cart of myItems) {
        mycartItems.push({
          courseId: cart.courseId,
          courseName: cart.courseName,
          price: cart.price,
        });
      }

      console.log(mycartItems);

      return res.status(200).json(mycartItems);
    }
  } catch (error) {
    return res.status(404).json({ message: "Error in myCart: ", error });
  }
};

const removeCart = async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    console.log(userId, courseId);
    const record = await Cart.findOne({
      userId: userId,
      courseId: courseId,
    });
    console.log(record);
    await Cart.findByIdAndDelete({ _id: record._id });
    return res.status(200).json(record);
  } catch (error) {
    return res.status(404).json({ message: "Error in removeCart: ", error });
  }
};

const trackProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    const { count, outOf } = req.body;

    const record = await Enroll.findOne({ userId: userId, courseId: courseId });
    const newCount = count;

    await Enroll.findOneAndUpdate(
      { _id: record._id },
      {
        count: newCount,
      }
    );

    const progress = (newCount / outOf) * 100;

    console.log(`trackProgress: [${userId}-${courseId}]-${progress}`);
    return res.status(200).json(progress);
  } catch (error) {
    return res.status(404).json({ message: "Error in trackProgress: ", error });
  }
};

const getProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    const record = await Enroll.findOne({ userId: userId, courseId: courseId });
    const p = Math.round((record.count / record.outOf) * 100);
    console.log(`getProgress: ${p}`);
    return res.status(200).json(p);
  } catch (error) {
    return res.status(404).json({ message: "Error in getProgress: ", error });
  }
};

module.exports = {
  enrollCourse,
  cancelEnrollment,
  myLernings,
  addToCart,
  myCart,
  removeCart,
  trackProgress,
  getProgress,
  getEnrollments,
  getStudentsCountPerCourse,
};
