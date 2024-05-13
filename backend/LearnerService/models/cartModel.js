const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    courseId: {
      type: "String",
      required: true,
    },
    courseName: {
      type: "String",
      required: true,
    },
    userId: {
      type: "String",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
