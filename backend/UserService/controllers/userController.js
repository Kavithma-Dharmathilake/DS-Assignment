const { default: mongoose } = require("mongoose");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { email, password, role, contact, address } = req.body;

  try {
    const user = await User.signup(email, password, role, contact, address);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token, role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UserController.js

// Retrieve user profile data by email
const getUserProfileByEmail = async (req, res) => {
  try {
    console.log("aedededededede-----" + req.body)
    const { email } = req.params;
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update user data by email
// const updateUserByEmail = async (req, res) => {
//   try {
//     const { email } = req.params;
//     const updatedUserData = req.body;
//
//     // Find the user by email and update the data
//     const updatedUser = await User.findOneAndUpdate({ email: email }, updatedUserData, { new: true });
//
//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }
//
//     res.status(200).json({ message: "User data updated successfully", user: updatedUser });
//   } catch (error) {
//     console.error("Error updating user data:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
// const updateUserByEmail = async (req, res) => {
//   try {
//     const email = req.body.email
//     const userData = req.body;
//     const updatedUser = await User.findOneAndUpdate({ email: email }, userData, { new: true });
//     res.json(updatedUser);
//     console.log(email);
//     console.log(userData);
//     res.status(200).json({ message: "User data updated successfully", updatedUser });
//   } catch (error) {
//     console.error("Error updating user data:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };



// const updateUserByEmail = async (req, res) => {
//   try {
//     const email = req.body.email;
//     const userData = req.body;
//     const updatedUser = await User.findOneAndUpdate({ email: email }, userData, { new: true });
//     console.log(email);
//     console.log(userData);
//     res.status(200).json({ message: "User data updated successfully", updatedUser });
//   } catch (error) {
//     console.error("Error updating user data:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// const updateUserByEmail = async (req, res) => {
//   try {
//     const email = req.body.email;
//     const userData = req.body;
//     const updatedUser = await User.findOneAndUpdate({ email: email }, userData, { new: true });
//     if (!updatedUser) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     console.log("User data updated successfully:", updatedUser);
//     res.status(200).json({ message: "User data updated successfully", updatedUser });
//   } catch (error) {
//     console.error("Error updating user data:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };




const updateUserByEmail = async (req, res) => {
  try {
    const { email, contact, address } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { $set: { contact: contact, address: address } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log("User data updated successfully:", updatedUser);
    res.status(200).json({ message: "User data updated successfully", updatedUser });
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getInstructors = async (req, res) => {
  try {
    // Fetch users with role as 'instructor'
    const instructors = await User.find({ role: 'instructor' });
    res.status(200).json(instructors);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getStudents = async (req, res) => {
  try {
    // Fetch users with role as 'student'
    const students = await User.find({ role: 'student' });
    res.status(200).json(students);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) =>{
 const { id } = req.params

 if(!mongoose.Types.ObjectId.isValid(id)){
  return res.status(404).json({error: "No such user found"})
 }

 const user = await userModel.findOneAndDelete({_id: id})

 if(!user){
  return res.status(404).json({error: "No such user found"})
 }
 res.status(200).json(user);

}


module.exports = {
  signupUser, loginUser, getUserProfileByEmail, updateUserByEmail,
  getInstructors,
  getStudents,
  deleteUser
};
