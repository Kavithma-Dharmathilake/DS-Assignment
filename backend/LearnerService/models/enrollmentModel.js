const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const enrollmentSchema = new Schema(
  {
    userId: {
      type: "String",
      required: true,
    },
    courseId: {
      type: "String",
      required: true,
    },
    courseName: {
      type: "String",
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    outOf: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("enrollCourses", enrollmentSchema);
