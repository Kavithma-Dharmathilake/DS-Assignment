const express = require("express");
const router = express.Router();
const {
  enrollCourse,
  cancelEnrollment,
  myLernings,
  addToCart,
  myCart,
  removeCart,
  trackProgress,
  getProgress,
  getEnrollments,
  getStudentsCountPerCourse
} = require("../controllers/enrollmentController");

//enrolling into a new course
router.post("/:userId/:courseCode", enrollCourse);

//cancel enrollment
router.delete("/:userId/:courseId/cancel", cancelEnrollment);

//myLernings
router.get("/:userId/myLernings", myLernings);

router.post("/addCart/:userId/:courseId", addToCart);

router.get("/myCart/:userId", myCart);
router.get("/studentpercourse", getStudentsCountPerCourse);

router.get("/allenroll", getEnrollments);

router.delete("/remove/:userId/:courseId/", removeCart);

router.patch("/myProgress/:userId/:courseId", trackProgress);

router.get("/getProgress/:userId/:courseId", getProgress);

module.exports = router;
