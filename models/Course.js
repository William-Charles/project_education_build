const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema({
  name: {
    type: String
  },
  desc: {
    type: String
  },
  outline: {
    type: String
  },
  image: {
    type: String
  },
  category: {
    type: String
  },
  interest: {
    type: String
  },
  challenges: {
    type: [],
    default: []
  }
});

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;

// videos: {
//   type: []
// },
// notes: {
//   type: Text
// },
// mockups: {
//   type: []
// },
// quiz: {
//   type: []
// }
