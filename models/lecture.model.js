const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Replace with your Sequelize connection

// Define the lecture model
const Lecture = sequelize.define('Lecture', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  startTime: {
    type: DataTypes.STRING,
    allowNull: false
  },
  endTime: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lecturerAttendanceIn: {
    type: DataTypes.DATE,
    defaultValue: null
  },
  lecturerAttendanceOut: {
    type: DataTypes.DATE,
    defaultValue: null
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});


Lecture.associate = models => {
  Lecture.belongsTo(models.User, { foreignKey: 'lecturer' });
};

module.exports = Lecture;
