const mongoose = require('mongoose');

// Define the lecture schema
const lectureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  lecturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lecturerAttendanceIn: {
    type: Date,
    default: null
  },
  lecturerAttendanceOut: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

});


// Create a Lecture model using the schema
const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = Lecture;