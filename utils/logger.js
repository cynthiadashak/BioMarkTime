// const winston = require('winston');
// const winstonDailyRotate = require('winston-daily-rotate-file');

// // Create a Winston logger
// const logger = winston.createLogger({
//   level: 'info', // Set the minimum logging level to "info"
//   format: winston.format.simple(), // Use the simple log format
//   transports: [
//     new winston.transports.Console(), // Log to the console
//     new winstonDailyRotate({
//       filename: './logs/app-%DATE%.log', // Specify the log file path and name pattern
//       datePattern: 'YYYY-MM-DD', // Use the date as the pattern for daily log files
//       level: 'info', // Set the minimum logging level for the file
//       format: winston.format.combine(
//         winston.format.timestamp(), // Add timestamps to log entries
//         winston.format.json() // Log in JSON format for easier parsing
//       )
//     })
//   ]
// });


// module.exports = logger
